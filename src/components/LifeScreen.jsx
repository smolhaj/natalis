import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import StatBar from './StatBar'
import FlagChip from './FlagChip'
import EventBox from './EventBox'
import ActivitiesPanel from './ActivitiesPanel'

const PHASE_LABELS = {
  early_childhood: 'Early Childhood',
  childhood: 'Childhood',
  adolescence: 'Adolescence',
  young_adult: 'Young Adult',
  midlife: 'Midlife',
  late_life: 'Late Life',
}

const BELT_NAMES = ['white','yellow','orange','green','blue','purple','red','brown','black']

function getPhase(age) {
  if (age <= 5) return 'early_childhood'
  if (age <= 11) return 'childhood'
  if (age <= 17) return 'adolescence'
  if (age <= 29) return 'young_adult'
  if (age <= 49) return 'midlife'
  return 'late_life'
}

function RelBar({ value, color }) {
  return (
    <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  )
}

function relColor(q) {
  return q > 65 ? '#34c759' : q > 35 ? '#ff9500' : '#ff3b30'
}

// Tab panels
const TABS = [
  { key: 'life',   label: 'Life',   emoji: '📖' },
  { key: 'stats',  label: 'Stats',  emoji: '📊' },
  { key: 'people', label: 'People', emoji: '👥' },
  { key: 'assets', label: 'Assets', emoji: '🏠' },
]

export default function LifeScreen() {
  const [showActivities, setShowActivities] = useState(false)
  const [activeTab, setActiveTab] = useState('life')

  const character    = useGameStore(s => s.character)
  const stats        = useGameStore(s => s.stats)
  const flags        = useGameStore(s => s.flags)
  const regret       = useGameStore(s => s.regret)
  const age          = useGameStore(s => s.age)
  const currentYear  = useGameStore(s => s.currentYear)
  const log          = useGameStore(s => s.log)
  const pendingEvent = useGameStore(s => s.pendingEvent)
  const career       = useGameStore(s => s.career)
  const education    = useGameStore(s => s.education)
  const partner      = useGameStore(s => s.partner)
  const children     = useGameStore(s => s.children)
  const inPrison     = useGameStore(s => s.inPrison)
  const prisonSentence = useGameStore(s => s.prisonSentence)
  const actionsThisYear = useGameStore(s => s.actionsThisYear)
  const maxActionsPerYear = useGameStore(s => s.maxActionsPerYear)
  const lastOutcome  = useGameStore(s => s.lastOutcome)
  const money        = useGameStore(s => s.money)
  const parents      = useGameStore(s => s.parents)
  const siblings     = useGameStore(s => s.siblings)
  const pets         = useGameStore(s => s.pets)
  const assets       = useGameStore(s => s.assets)
  const karma        = useGameStore(s => s.karma)
  const fame         = useGameStore(s => s.fame)
  const retired      = useGameStore(s => s.retired)
  const gpa          = useGameStore(s => s.gpa)
  const friends      = useGameStore(s => s.friends)
  const socialMedia  = useGameStore(s => s.socialMedia)
  const martialArts  = useGameStore(s => s.martialArts)
  const birthControl = useGameStore(s => s.birthControl)
  const criminalRecord = useGameStore(s => s.criminalRecord)
  const mentalHealth = useGameStore(s => s.mentalHealth)
  const hobbies      = useGameStore(s => s.hobbies)
  const fitness      = useGameStore(s => s.fitness)
  const debt         = useGameStore(s => s.debt)
  const pendingMinigame = useGameStore(s => s.pendingMinigame)
  const ageUp        = useGameStore(s => s.ageUp)

  if (!character) return null

  const phase = getPhase(age)
  const recentLog = [...log].reverse().slice(0, 40)
  const actionsLeft = maxActionsPerYear - actionsThisYear
  const hasAddiction = flags.includes('alcohol_addiction') || flags.includes('gambling_addiction') || flags.includes('drug_addiction')

  const formatMoney = (n) => {
    if (!n) return '$0'
    if (n >= 1000000) return `$${(n/1000000).toFixed(2)}M`
    if (n >= 1000) return `$${Math.round(n/1000)}k`
    return `$${n.toLocaleString()}`
  }

  return (
    <div className="h-screen bg-natalis-bg flex flex-col overflow-hidden">

      {/* ── Top Header ─────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-natalis-border flex-shrink-0 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
              style={{ background: character.gender === 'male' ? 'linear-gradient(135deg,#5ac8fa,#007aff)' : 'linear-gradient(135deg,#ff2d55,#af52de)' }}>
              {character.gender === 'male' ? '👦' : '👧'}
            </div>
            <div>
              <p className="font-bold text-natalis-text text-sm leading-tight">{character.firstName} {character.surname}</p>
              <p className="text-natalis-muted text-xs">{career ? career.title : (retired ? 'Retired' : PHASE_LABELS[phase])}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-bit-green text-base leading-tight">{formatMoney(money)}</p>
            <p className="text-natalis-muted text-xs">Age {age} · {currentYear}</p>
          </div>
        </div>
      </header>

      {/* ── Stats strip ────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-natalis-border flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-3 grid grid-cols-2 gap-x-6 gap-y-2">
          <StatBar stat="happiness" label="Happiness" value={stats.happiness} />
          <StatBar stat="health"    label="Health"    value={stats.health} />
          <StatBar stat="smarts"    label="Smarts"    value={stats.smarts} />
          <StatBar stat="looks"     label="Looks"     value={stats.looks} />
        </div>
      </div>

      {/* ── Tab bar ────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-natalis-border flex-shrink-0">
        <div className="max-w-2xl mx-auto flex">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setShowActivities(false) }}
              className="flex-1 py-2.5 flex flex-col items-center gap-0.5 transition-all"
              style={{ borderBottom: activeTab === tab.key ? '2.5px solid #007aff' : '2.5px solid transparent' }}
            >
              <span className="text-base">{tab.emoji}</span>
              <span className="text-xs font-semibold" style={{ color: activeTab === tab.key ? '#007aff' : '#8e8e93' }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content area ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4 pb-28">

          {/* Prison banner */}
          {inPrison && (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="font-bold text-red-600 text-sm">In Prison</p>
                <p className="text-red-500 text-xs">{prisonSentence} year{prisonSentence !== 1 ? 's' : ''} remaining</p>
              </div>
            </div>
          )}

          {/* Addiction warning */}
          {hasAddiction && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-bold text-orange-600 text-sm">Active Addiction</p>
                <p className="text-orange-500 text-xs">Consider visiting Rehab in Activities.</p>
              </div>
            </div>
          )}

          {/* Pending event */}
          {pendingEvent && <EventBox event={pendingEvent} />}

          {/* Last outcome flash */}
          {lastOutcome && !pendingEvent && (
            <div className="bg-white rounded-xl px-4 py-3 border border-natalis-border shadow-sm flex items-start gap-2">
              <span className="text-base">💬</span>
              <p className="text-natalis-dim text-sm italic leading-relaxed">{lastOutcome}</p>
            </div>
          )}

          {/* ── LIFE TAB ── */}
          {activeTab === 'life' && (
            <div className="space-y-3">
              {recentLog.map((entry, i) => (
                <div
                  key={i}
                  className={`rounded-xl px-4 py-3 border text-sm leading-relaxed ${
                    entry.isWorld
                      ? 'bg-amber-50 border-amber-200 text-amber-800'
                      : entry.isKey
                      ? 'bg-blue-50 border-blue-200 text-blue-800'
                      : 'bg-white border-natalis-border text-natalis-dim'
                  }`}
                >
                  <span className="font-bold mr-2 text-xs uppercase tracking-wider opacity-60">
                    Age {entry.age}
                  </span>
                  {entry.text}
                </div>
              ))}
              {recentLog.length === 0 && (
                <div className="bg-white rounded-2xl px-5 py-8 text-center border border-natalis-border">
                  <p className="text-4xl mb-2">🌱</p>
                  <p className="text-natalis-muted text-sm">Your life story begins here.</p>
                </div>
              )}
            </div>
          )}

          {/* ── STATS TAB ── */}
          {activeTab === 'stats' && (
            <div className="space-y-3">
              {/* All stats */}
              <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card space-y-4">
                <p className="font-bold text-natalis-text text-sm">Your Stats</p>
                <StatBar stat="happiness" label="Happiness" value={stats.happiness} />
                <StatBar stat="health"    label="Health"    value={stats.health} />
                <StatBar stat="smarts"    label="Smarts"    value={stats.smarts} />
                <StatBar stat="looks"     label="Looks"     value={stats.looks} />
                <StatBar stat="charisma"  label="Charisma"  value={stats.charisma} />
                <StatBar stat="wealth"    label="Wealth"    value={stats.wealth} />
              </div>

              {/* Extra stats */}
              <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                <p className="font-bold text-natalis-text text-sm mb-3">Profile</p>
                <div className="space-y-2">
                  {[
                    { label: 'Karma', value: karma, emoji: karma > 60 ? '😇' : karma < 40 ? '😈' : '😐', color: karma > 60 ? '#34c759' : karma < 40 ? '#ff3b30' : '#ff9500' },
                    { label: 'Fame', value: fame, emoji: '⭐', color: '#ffcc00' },
                    { label: 'Regret', value: regret, emoji: '😔', color: '#8e8e93' },
                  ].map(({ label, value, emoji, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{emoji}</span>
                        <span className="text-sm text-natalis-dim font-medium">{label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
                        </div>
                        <span className="text-xs font-bold text-natalis-muted w-8 text-right">{Math.round(value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Life status */}
              <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                <p className="font-bold text-natalis-text text-sm mb-3">Life Status</p>
                <div className="space-y-2 text-sm">
                  {[
                    { label: '📍 Country', value: character.country.name },
                    { label: '📅 Phase', value: PHASE_LABELS[phase] },
                    { label: '🎓 Education', value: education.level !== 'none' ? `${education.level.replace('_',' ')}${education.field ? ` · ${education.field}` : ''}` : 'None' },
                    gpa !== null && { label: '📝 GPA', value: gpa.toFixed(2) },
                    martialArts?.discipline && { label: '🥋 Martial Arts', value: `${martialArts.discipline} — ${BELT_NAMES[martialArts.belt ?? 0]} belt` },
                    socialMedia?.followers > 0 && { label: '📱 Followers', value: `${socialMedia.followers >= 1000 ? `${(socialMedia.followers/1000).toFixed(1)}k` : socialMedia.followers}${socialMedia.verified ? ' ✓' : ''}` },
                    birthControl && { label: '💊 Birth Control', value: 'Active' },
                    inPrison && { label: '🔒 Prison', value: `${prisonSentence} yr remaining` },
                    criminalRecord.length > 0 && { label: '⚠️ Record', value: `${criminalRecord.length} offence${criminalRecord.length !== 1 ? 's' : ''}` },
                    fitness !== undefined && { label: '💪 Fitness', value: `${Math.round(fitness ?? 50)}/100` },
                    mentalHealth?.condition && { label: '🧠 Mental Health', value: `${mentalHealth.condition}${mentalHealth.therapy ? ' · therapy' : ''}${mentalHealth.medicating ? ' · medicated' : ''}` },
                    (debt ?? 0) > 0 && { label: '💳 Debt', value: formatMoney(debt) },
                  ].filter(Boolean).map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-1 border-b border-natalis-border last:border-0">
                      <span className="text-natalis-muted text-xs">{label}</span>
                      <span className="text-natalis-text font-semibold text-xs capitalize">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hobbies */}
              {hobbies && Object.keys(hobbies).length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">Hobbies</p>
                  <div className="space-y-2">
                    {Object.entries(hobbies).map(([hobby, level]) => {
                      const hobbyEmoji = { music: '🎸', art: '🎨', sport: '⚽', writing: '✍️', cooking: '🍳', coding: '💻', general: '🎯' }[hobby] ?? '🎯'
                      const tier = level >= 80 ? 'Master' : level >= 60 ? 'Expert' : level >= 40 ? 'Skilled' : level >= 20 ? 'Learning' : 'Beginner'
                      return (
                        <div key={hobby} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>{hobbyEmoji}</span>
                            <span className="text-sm text-natalis-dim font-medium capitalize">{hobby}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-purple-400" style={{ width: `${level}%` }} />
                            </div>
                            <span className="text-xs text-natalis-muted w-16 text-right">{tier}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Flags */}
              {flags.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">Life Flags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {flags.map(f => <FlagChip key={f} flag={f} />)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── PEOPLE TAB ── */}
          {activeTab === 'people' && (
            <div className="space-y-3">
              {/* Career */}
              {career && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">💼 Career</p>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-natalis-text">{career.title}</p>
                      <p className="text-bit-green font-bold text-sm">{formatMoney(career.salary)}/yr</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                      Yr {career.yearsInRole}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-natalis-muted">
                      <span>Performance</span>
                      <span>{Math.round(career.performance ?? 70)}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${career.performance ?? 70}%`, backgroundColor: (career.performance ?? 70) > 60 ? '#34c759' : (career.performance ?? 70) > 30 ? '#ff9500' : '#ff3b30' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Partner */}
              {partner && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">❤️ Partner</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-natalis-text">{partner.name}</p>
                      <p className="text-natalis-muted text-xs">{partner.married ? '💍 Married' : partner.engaged ? '💌 Engaged' : '💑 Dating'}</p>
                    </div>
                    <RelBar value={partner.relationshipQuality} color={relColor(partner.relationshipQuality)} />
                  </div>
                </div>
              )}

              {/* Children */}
              {children.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">👨‍👩‍👧 Children</p>
                  <div className="space-y-2">
                    {children.map((child, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <p className="text-natalis-dim text-sm">{child.name.split(' ')[0]}</p>
                        <RelBar value={child.relationshipQuality} color={relColor(child.relationshipQuality)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Parents */}
              {parents && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">👪 Parents</p>
                  <div className="space-y-2">
                    {['mother', 'father'].map(key => {
                      const p = parents[key]
                      if (!p) return null
                      return (
                        <div key={key} className="flex justify-between items-center">
                          <div>
                            <p className="text-natalis-dim text-sm">{p.name.split(' ')[0]}</p>
                            {!p.alive && <p className="text-natalis-muted text-xs">Deceased</p>}
                          </div>
                          {p.alive
                            ? <RelBar value={p.relationshipQuality} color={relColor(p.relationshipQuality)} />
                            : <span className="text-xs text-natalis-muted">✞</span>
                          }
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Siblings */}
              {siblings && siblings.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">👫 Siblings</p>
                  <div className="space-y-2">
                    {siblings.map((sib, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div>
                          <p className="text-natalis-dim text-sm">{sib.name.split(' ')[0]}</p>
                          {!sib.alive && <p className="text-natalis-muted text-xs">Deceased</p>}
                        </div>
                        {sib.alive
                          ? <RelBar value={sib.relationshipQuality} color={relColor(sib.relationshipQuality)} />
                          : <span className="text-xs text-natalis-muted">✞</span>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Friends */}
              {friends && friends.filter(f => f.alive).length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">👥 Friends</p>
                  <div className="space-y-2">
                    {friends.filter(f => f.alive).map((friend, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <p className="text-natalis-dim text-sm">{friend.name.split(' ')[0]}</p>
                        <RelBar value={friend.relationshipQuality} color={relColor(friend.relationshipQuality)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pets */}
              {pets && pets.filter(p => p.alive).length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">🐾 Pets</p>
                  <div className="space-y-1">
                    {pets.filter(p => p.alive).map((pet, i) => (
                      <p key={i} className="text-natalis-dim text-sm capitalize">{pet.name} the {pet.species} · age {pet.age}</p>
                    ))}
                  </div>
                </div>
              )}

              {!partner && children.length === 0 && (!friends || friends.filter(f=>f.alive).length === 0) && (
                <div className="bg-white rounded-2xl px-5 py-8 text-center border border-natalis-border">
                  <p className="text-4xl mb-2">🤝</p>
                  <p className="text-natalis-muted text-sm">No relationships yet. Get out there!</p>
                </div>
              )}
            </div>
          )}

          {/* ── ASSETS TAB ── */}
          {activeTab === 'assets' && (
            <div className="space-y-3">
              {/* Finances */}
              <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                <p className="font-bold text-natalis-text text-sm mb-3">💰 Finances</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-xl p-3">
                    <p className="text-xs text-green-700 font-semibold mb-1">Net Worth</p>
                    <p className="font-bold text-green-700 text-lg">{formatMoney(money)}</p>
                  </div>
                  {career && (
                    <div className="bg-blue-50 rounded-xl p-3">
                      <p className="text-xs text-blue-700 font-semibold mb-1">Annual Salary</p>
                      <p className="font-bold text-blue-700 text-lg">{formatMoney(career.salary)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Properties */}
              {assets?.properties?.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">🏠 Properties</p>
                  <div className="space-y-2">
                    {assets.properties.map((prop, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-natalis-border last:border-0">
                        <p className="text-natalis-dim text-sm">{prop.name}</p>
                        <div className="text-right">
                          <p className="font-bold text-natalis-text text-sm">{formatMoney(prop.currentValue)}</p>
                          {prop.mortgage > 0 && <p className="text-xs text-red-500">-{formatMoney(prop.mortgage)}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vehicles */}
              {assets?.vehicles?.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">🚗 Vehicles</p>
                  <div className="space-y-2">
                    {assets.vehicles.map((v, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <p className="text-natalis-dim text-sm">{v.name}</p>
                        <p className="font-bold text-natalis-text text-sm">{formatMoney(v.currentValue)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {assets?.properties?.length === 0 && assets?.vehicles?.length === 0 && (
                <div className="bg-white rounded-2xl px-5 py-8 text-center border border-natalis-border">
                  <p className="text-4xl mb-2">🏦</p>
                  <p className="text-natalis-muted text-sm">No assets yet. Start saving!</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ── Activities Panel (slides up) ─────────────────────────────── */}
      {showActivities && !pendingEvent && (
        <div className="fixed inset-0 z-40 flex flex-col justify-end" onClick={() => setShowActivities(false)}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-50 bg-natalis-bg rounded-t-3xl max-h-[80vh] overflow-hidden shadow-card-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="overflow-y-auto max-h-[75vh]">
              <ActivitiesPanel onClose={() => setShowActivities(false)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom bar ──────────────────────────────────────────────────── */}
      {!pendingEvent && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-natalis-border shadow-card-lg">
          <div className="max-w-2xl mx-auto flex items-center px-4 py-2 gap-3">

            {/* Actions remaining dots */}
            <div className="flex gap-1">
              {Array.from({ length: maxActionsPerYear }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: i < actionsThisYear ? '#e5e5ea' : '#007aff' }} />
              ))}
            </div>

            {/* Activities button */}
            {!inPrison && (
              <button
                onClick={() => setShowActivities(v => !v)}
                disabled={actionsLeft <= 0}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-40"
                style={{
                  background: actionsLeft > 0 ? 'linear-gradient(135deg,#af52de,#007aff)' : '#e5e5ea',
                  color: actionsLeft > 0 ? 'white' : '#8e8e93',
                }}
              >
                {showActivities ? '✕ Close' : '⚡ Activities'}
              </button>
            )}

            {/* Age Up — the big button */}
            <button
              onClick={ageUp}
              className="flex-1 py-3 rounded-xl font-black text-lg text-white transition-all active:scale-95 shadow-card"
              style={{ background: 'linear-gradient(135deg, #34c759, #28a046)' }}
            >
              Age Up +
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

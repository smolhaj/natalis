import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { ACTIVITIES } from '../data/activities'
import { CRIMES } from '../data/crimes'
import { PROPERTY_TYPES, VEHICLE_TYPES } from '../data/assets'
import { getAvailableCareers, dropOutOfSchool } from '../engine/gameEngine'

const TOP_CATEGORIES = [
  { key: 'mind_body',     label: 'Mind & Body',     emoji: '🧘', desc: 'Work on yourself' },
  { key: 'hobbies',       label: 'Hobbies',          emoji: '🎸', desc: 'Practice skills and creative pursuits' },
  { key: 'education',     label: 'Education',        emoji: '📚', desc: 'Study and learn' },
  { key: 'love',          label: 'Love',             emoji: '❤️',  desc: 'Relationships' },
  { key: 'fertility',     label: 'Fertility',        emoji: '👶', desc: 'Family planning' },
  { key: 'nightlife',     label: 'Nightlife',        emoji: '🍸', desc: 'Go out and party' },
  { key: 'movies',        label: 'Movie Theater',    emoji: '🎬', desc: 'Catch a film' },
  { key: 'salon',         label: 'Salon & Spa',      emoji: '💆', desc: 'Take care of yourself' },
  { key: 'shopping',      label: 'Shopping',         emoji: '🛍️',  desc: 'Treat yourself' },
  { key: 'social_media',  label: 'Social Media',     emoji: '📱', desc: 'Manage your online presence' },
  { key: 'plastic_surg',  label: 'Plastic Surgery',  emoji: '✂️',  desc: 'Enhance your appearance' },
  { key: 'race_tracks',   label: 'Race Tracks',      emoji: '🏇', desc: 'Bet on the races' },
  { key: 'rehab',         label: 'Rehab',            emoji: '☀️',  desc: 'Battle addictions' },
  { key: 'substances',   label: 'Substances',       emoji: '💊', desc: 'Alcohol and drugs' },
  { key: 'pets',          label: 'Pets',             emoji: '🐾', desc: 'Your animal companions' },
  { key: 'licenses',      label: 'Licenses',         emoji: '🪪', desc: 'Get licenced' },
  { key: 'assets',        label: 'Assets',           emoji: '🏠', desc: 'Property & vehicles' },
  { key: 'money',         label: 'Money',            emoji: '💰', desc: 'Financial activities' },
  { key: 'crime',         label: 'Crime',            emoji: '⚠️',  desc: 'Illegal activities' },
  { key: 'career',        label: 'Career',           emoji: '💼', desc: 'Your working life' },
  { key: 'friends',       label: 'Friends',          emoji: '👥', desc: 'Your social circle' },
]

const MARTIAL_DISCIPLINES = ['Jiu-Jitsu', 'Taekwondo', 'Judo', 'Karate', 'Kung Fu']
const BELT_NAMES = ['white', 'yellow', 'orange', 'green', 'blue', 'purple', 'red', 'brown', 'black']

function Btn({ onClick, disabled, title, subtitle, cost, danger }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-4 py-3 rounded-xl border transition-all disabled:opacity-40 disabled:cursor-not-allowed space-y-0.5 active:scale-95
        ${danger
          ? 'border-red-200 bg-red-50 hover:bg-red-100'
          : 'border-natalis-border bg-white hover:bg-blue-50 hover:border-bit-blue'
        }`}
    >
      <p className={`text-sm font-semibold ${danger ? 'text-bit-red' : 'text-natalis-text'}`}>{title}</p>
      {subtitle && <p className="text-natalis-muted text-xs">{subtitle}</p>}
      {cost && <p className="text-xs font-medium" style={{ color: '#007aff' }}>{cost}</p>}
    </button>
  )
}

export default function ActivitiesPanel({ onClose }) {
  const [activeTop, setActiveTop] = useState(null)
  const [martialDiscipline, setMartialDiscipline] = useState(null)
  const [horseIdx, setHorseIdx] = useState(0)
  const [betAmount, setBetAmount] = useState(100)

  const state = useGameStore(s => s)
  const takeActivity       = useGameStore(s => s.takeActivity)
  const commitCrime        = useGameStore(s => s.commitCrime)
  const enterCareer        = useGameStore(s => s.enterCareer)
  const meetSomeone        = useGameStore(s => s.meetSomeone)
  const hookUp             = useGameStore(s => s.hookUp)
  const goOnDate           = useGameStore(s => s.goOnDate)
  const complimentPartner  = useGameStore(s => s.complimentPartner)
  const proposeMarriage    = useGameStore(s => s.proposeMarriage)
  const getMarried         = useGameStore(s => s.getMarried)
  const fileForDivorce     = useGameStore(s => s.fileForDivorce)
  const tryForChild        = useGameStore(s => s.tryForChild)
  const spendTimeWithChild = useGameStore(s => s.spendTimeWithChild)
  const callParent         = useGameStore(s => s.callParent)
  const callSibling        = useGameStore(s => s.callSibling)
  const adoptChild         = useGameStore(s => s.adoptChild)
  const getPlasticSurgery  = useGameStore(s => s.getPlasticSurgery)
  const askForRaise        = useGameStore(s => s.askForRaise)
  const quitJob            = useGameStore(s => s.quitJob)
  const workHarder         = useGameStore(s => s.workHarder)
  const schmoozeBoss       = useGameStore(s => s.schmoozeBoss)
  const retire             = useGameStore(s => s.retire)
  const buyProperty        = useGameStore(s => s.buyProperty)
  const sellProperty       = useGameStore(s => s.sellProperty)
  const buyVehicle         = useGameStore(s => s.buyVehicle)
  const sellVehicle        = useGameStore(s => s.sellVehicle)
  const adoptPet           = useGameStore(s => s.adoptPet)
  const visitVet           = useGameStore(s => s.visitVet)
  const studyHarder        = useGameStore(s => s.studyHarder)
  const goToMovies         = useGameStore(s => s.goToMovies)
  const goClubbing         = useGameStore(s => s.goClubbing)
  const goShopping         = useGameStore(s => s.goShopping)
  const visitSalonSpa      = useGameStore(s => s.visitSalonSpa)
  const postSocialMedia    = useGameStore(s => s.postSocialMedia)
  const promoteSocialMedia = useGameStore(s => s.promoteSocialMedia)
  const betOnHorses        = useGameStore(s => s.betOnHorses)
  const goToRehab          = useGameStore(s => s.goToRehab)
  const toggleBirthControl = useGameStore(s => s.toggleBirthControl)
  const practiceMartalArts = useGameStore(s => s.practiceMartalArts)
  const obtainLicense      = useGameStore(s => s.obtainLicense)
  const interactWithFriend = useGameStore(s => s.interactWithFriend)
  const dropOutOfSchool    = useGameStore(s => s.dropOutOfSchool)
  const abandonChild       = useGameStore(s => s.abandonChild)
  const useSubstance       = useGameStore(s => s.useSubstance)
  const triggerMinigame    = useGameStore(s => s.triggerMinigame)

  const actionsLeft = state.maxActionsPerYear - state.actionsThisYear
  const noActions = actionsLeft <= 0
  const G = { character: state.character, stats: state.stats, flags: state.flags, age: state.age, career: state.career, education: state.education, inPrison: state.inPrison, partner: state.partner }

  function go(fn) { fn(); onClose() }

  const hasAddiction = state.flags.includes('alcohol_addiction') || state.flags.includes('gambling_addiction') || state.flags.includes('drug_addiction')
  const ma = state.martialArts ?? { discipline: null, belt: 0 }
  const sm = state.socialMedia ?? { followers: 0, verified: false }

  // ── Sub-panel renderer ────────────────────────────────────────────────────────

  const renderSub = () => {
    switch (activeTop) {

      case 'mind_body': {
        const mindActivities = ACTIVITIES.mind ?? []
        return (
          <>
            {/* Gym */}
            <Btn disabled={noActions} onClick={() => go(() => takeActivity('gym'))} title="Go to the Gym" subtitle="Improve your fitness and health." cost="Cost: $20/visit" />
            {/* Walk */}
            <Btn disabled={noActions} onClick={() => go(() => takeActivity('walk'))} title="Go for a Walk" subtitle="Clear your head and move your body." />
            {/* Meditate */}
            {state.age >= 12 && <Btn disabled={noActions} onClick={() => go(() => takeActivity('meditate'))} title="Meditate" subtitle="Stillness and mental discipline." />}
            {/* Library */}
            {state.age >= 8 && <Btn disabled={noActions} onClick={() => go(() => takeActivity('library'))} title="Visit the Library" subtitle="Expand your knowledge." />}
            {/* Read book */}
            {state.age >= 8 && <Btn disabled={noActions} onClick={() => go(() => takeActivity('read'))} title="Read a Book" subtitle="A good book never hurts." />}
            {/* Diet */}
            {state.age >= 14 && <Btn disabled={noActions} onClick={() => go(() => takeActivity('diet'))} title="Go on a Diet" subtitle="Improve your health and appearance." />}
            {/* Gardening */}
            {state.age >= 10 && <Btn disabled={noActions} onClick={() => go(() => takeActivity('gardening'))} title="Gardening" subtitle="Get your hands in the earth." />}
            {/* Therapy */}
            {state.age >= 16 && <Btn disabled={noActions} onClick={() => go(() => takeActivity('book_therapy'))} title="🛋️ Book Therapy" subtitle="Address your mental health with a professional." cost="$120" />}
            {/* Martial Arts */}
            {state.age >= 12 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">
                  Martial Arts {ma.discipline ? `— ${ma.discipline} (${BELT_NAMES[ma.belt ?? 0]} belt)` : ''}
                </p>
                {!ma.discipline
                  ? MARTIAL_DISCIPLINES.map(d => (
                      <Btn key={d} disabled={noActions} onClick={() => go(() => practiceMartalArts(d))} title={`Start ${d}`} subtitle="Begin your martial arts journey." />
                    ))
                  : <Btn disabled={noActions} onClick={() => go(() => practiceMartalArts(ma.discipline))} title={`Train ${ma.discipline}`} subtitle={`Current belt: ${BELT_NAMES[ma.belt ?? 0]}`} />
                }
              </>
            )}
          </>
        )
      }

      case 'education': {
        const enrolled = state.education?.enrolled
        const gpa = state.gpa
        const isGraduate = state.education.level === 'university'
        return (
          <>
            {/* Enrollment status */}
            {enrolled && (
              <div className="bg-white rounded-xl border border-natalis-border px-4 py-3 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-natalis-muted">Currently Enrolled</p>
                <p className="font-bold text-natalis-text text-sm">
                  {enrolled.type === 'university' ? '🎓' : '🔧'} {enrolled.field} — Year {(enrolled.year ?? 0) + 1} of {enrolled.type === 'university' ? 4 : 2}
                </p>
                <div className="w-full h-2 bg-natalis-bg rounded-full overflow-hidden mt-1">
                  <div className="h-full rounded-full" style={{ width: `${((enrolled.year ?? 0) / (enrolled.type === 'university' ? 4 : 2)) * 100}%`, background: 'linear-gradient(90deg, #007aff, #5ac8fa)' }} />
                </div>
              </div>
            )}
            {gpa !== null && (
              <div className="flex items-center justify-between bg-white rounded-xl border border-natalis-border px-4 py-3">
                <span className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">🎓 GPA</span>
                <span className="font-bold text-sm" style={{ color: gpa >= 3.5 ? '#34c759' : gpa >= 2.5 ? '#ff9500' : '#ff3b30' }}>{gpa.toFixed(2)}</span>
              </div>
            )}
            {state.age >= 10 && state.age <= 25 && (
              <Btn disabled={noActions} onClick={() => go(studyHarder)} title="Study Harder" subtitle="Extra effort boosts GPA and smarts." />
            )}
            {enrolled && (
              <Btn disabled={false} onClick={() => go(dropOutOfSchool)} title="Drop Out" subtitle="Leave your program early." danger />
            )}
            {!enrolled && state.flags.includes('university_graduate') && !isGraduate && (
              <Btn disabled={noActions} onClick={() => go(studyHarder)} title="Pursue Graduate Studies" subtitle="Apply for postgraduate research." />
            )}
            {(ACTIVITIES.mind ?? [])
              .filter(a => ['study', 'online_course', 'learn_language', 'philosophy'].includes(a.id))
              .filter(a => (!a.minAge || state.age >= a.minAge) && (!a.maxAge || state.age <= a.maxAge))
              .map(a => (
                <Btn key={a.id} disabled={noActions} onClick={() => go(() => takeActivity(a.id))} title={a.name} subtitle={a.description} cost={a.cost > 0 ? `Cost: $${a.cost}` : null} />
              ))
            }
          </>
        )
      }

      case 'love': {
        return (
          <>
            {state.age >= 16 && !state.partner && (
              <Btn disabled={noActions} onClick={() => go(meetSomeone)} title="Meet Someone New" subtitle="Put yourself out there." />
            )}
            {state.age >= 14 && (
              <Btn disabled={noActions} onClick={() => go(hookUp)} title="Hook Up" subtitle="Casual. No strings. Probably." />
            )}
            {state.partner && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-1">{state.partner.name}</p>
                <Btn disabled={noActions} onClick={() => go(goOnDate)} title="Go on a Date" subtitle={`Quality time with ${state.partner.name}.`} cost="Cost: $40–$180" />
                <Btn disabled={noActions} onClick={() => go(complimentPartner)} title="Show Appreciation" subtitle="Say something true and kind." />
                {!state.partner.engaged && !state.partner.married && (
                  <Btn disabled={noActions} onClick={() => go(proposeMarriage)} title="Propose Marriage" subtitle="Requires a strong relationship." />
                )}
                {state.partner.engaged && !state.partner.married && (
                  <Btn disabled={noActions} onClick={() => go(getMarried)} title="Get Married" subtitle="Plan the ceremony." cost="Cost: $800–$18,000" />
                )}
                {state.partner.married && (
                  <Btn disabled={noActions} onClick={() => go(tryForChild)} title="Try for a Child" subtitle={state.birthControl ? "Disable birth control first." : "Start or grow your family."} />
                )}
                <Btn disabled={noActions} onClick={() => go(fileForDivorce)} title={state.partner.married ? 'File for Divorce' : 'Break Up'} subtitle="End the relationship." danger />
              </>
            )}
            {state.children.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Children</p>
                {state.children.map((child, i) => (
                  <Btn key={i} disabled={noActions} onClick={() => go(() => spendTimeWithChild(i))} title={`Spend time with ${child.name.split(' ')[0]}`} subtitle="Be present in their life." />
                ))}
                {state.children.map((child, i) => (
                  <Btn key={`abandon-${i}`} disabled={false}
                    onClick={() => { if (window.confirm(`Abandon ${child.name.split(' ')[0]}? This cannot be undone.`)) { abandonChild(i); onClose() } }}
                    title={`Abandon ${child.name.split(' ')[0]}`}
                    subtitle="Walk away. You will carry this."
                    danger />
                ))}
              </>
            )}
            {state.parents && (
              <>
                {['mother', 'father'].map(key => {
                  const p = state.parents[key]
                  if (!p?.alive) return null
                  return <Btn key={key} disabled={noActions} onClick={() => go(() => callParent(key))} title={`Call your ${key}`} subtitle={`${p.name}. Stay in touch.`} />
                })}
              </>
            )}
            {state.siblings && state.siblings.filter(s => s.alive).map((sib, i) => {
              const realIdx = state.siblings.indexOf(sib)
              return <Btn key={i} disabled={noActions} onClick={() => go(() => callSibling(realIdx))} title={`Call ${sib.name.split(' ')[0]}`} subtitle="Your sibling." />
            })}
            {state.age >= 25 && (
              <Btn disabled={noActions} onClick={() => go(adoptChild)} title="Adopt a Child" subtitle="Open your home and your life." />
            )}
          </>
        )
      }

      case 'fertility': {
        return (
          <>
            <div className="flex items-center justify-between bg-white rounded-xl border border-natalis-border px-4 py-3 mb-1">
              <span className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">Birth Control</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: state.birthControl ? '#34c759' : '#ff3b30' }}>
                {state.birthControl ? 'ON' : 'OFF'}
              </span>
            </div>
            <Btn
              disabled={false}
              onClick={() => go(toggleBirthControl)}
              title={state.birthControl ? 'Disable Birth Control' : 'Enable Birth Control'}
              subtitle={state.birthControl ? 'You are currently protected.' : 'Prevent pregnancy.'}
            />
            {state.partner && !state.birthControl && state.age < 50 && (
              <Btn disabled={noActions} onClick={() => go(tryForChild)} title="Try for a Child" subtitle="Actively try to conceive." />
            )}
            {state.age >= 18 && !state.flags.includes('vasectomy') && !state.flags.includes('tubal_ligation') && (
              <Btn
                disabled={noActions}
                onClick={() => go(() => {
                  const flag = state.character?.gender === 'male' ? 'vasectomy' : 'tubal_ligation'
                  useGameStore.getState().takeActivity('sterilization')
                })}
                title={state.character?.gender === 'male' ? 'Vasectomy' : 'Tubal Ligation'}
                subtitle="Permanent sterilisation."
                cost="Cost: $1,500"
                danger
              />
            )}
          </>
        )
      }

      case 'nightlife': {
        return (
          <>
            <Btn disabled={noActions || state.age < 18} onClick={() => go(goClubbing)} title="Go Clubbing" subtitle="Drinks, dancing, and debauchery." cost="Cost: $50–$120" />
            {(ACTIVITIES.social ?? []).filter(a => ['volunteer', 'join_club'].includes(a.id)).map(a => (
              <Btn key={a.id} disabled={noActions} onClick={() => go(() => takeActivity(a.id))} title={a.name} subtitle={a.description} />
            ))}
          </>
        )
      }

      case 'movies': {
        return (
          <>
            <Btn disabled={noActions} onClick={() => go(goToMovies)} title="Watch a Film" subtitle="Catch something at the cinema." cost="Cost: $15–$25" />
          </>
        )
      }

      case 'salon': {
        const services = [
          { id: 'haircut',  label: 'Haircut',     desc: 'A fresh cut.', cost: '$60' },
          { id: 'hairdye',  label: 'Hair Dye',    desc: 'A new color.', cost: '$120' },
          { id: 'massage',  label: 'Massage',     desc: 'Full-body tension relief.', cost: '$150' },
          { id: 'facial',   label: 'Facial',      desc: 'Rejuvenate your skin.', cost: '$100' },
          { id: 'manicure', label: 'Manicure',    desc: 'Small luxury, big mood.', cost: '$50' },
        ]
        return services.map(s => (
          <Btn key={s.id} disabled={noActions} onClick={() => go(() => visitSalonSpa(s.id))} title={s.label} subtitle={s.desc} cost={s.cost} />
        ))
      }

      case 'shopping': {
        return (
          <>
            <Btn disabled={noActions} onClick={() => go(() => goShopping('clothes'))} title="Clothes Shopping" subtitle="Pick up some new threads." cost="~$200" />
            <Btn disabled={noActions} onClick={() => go(() => goShopping('electronics'))} title="Electronics" subtitle="New gadgets and tech." cost="~$800" />
            <Btn disabled={noActions} onClick={() => go(() => goShopping('luxury'))} title="Luxury Goods" subtitle="Something indulgent." cost="~$3,000" />
          </>
        )
      }

      case 'social_media': {
        return (
          <>
            <div className="flex items-center justify-between bg-white rounded-xl border border-natalis-border px-4 py-3 mb-1">
              <span className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">📱 Followers</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-natalis-text text-sm">{sm.followers.toLocaleString()}</span>
                {sm.verified && <span className="text-xs font-bold text-white bg-bit-blue px-2 py-0.5 rounded-full">✓ Verified</span>}
              </div>
            </div>
            <Btn disabled={noActions} onClick={() => go(postSocialMedia)} title="Post Content" subtitle="Share a post and grow your audience." />
            {sm.followers >= 5000 && (
              <Btn disabled={noActions} onClick={() => go(promoteSocialMedia)} title="Promote a Product" subtitle="Earn money through sponsorships." cost="Requires 5k+ followers" />
            )}
          </>
        )
      }

      case 'plastic_surg': {
        if (state.age < 18) return <p className="text-natalis-muted text-sm italic p-3">You must be 18+ for plastic surgery.</p>
        const surgeries = [
          { type: 'minor',    label: 'Minor Procedure',  desc: 'Small adjustments. High success rate.', cost: '$3,000' },
          { type: 'major',    label: 'Major Procedure',  desc: 'Significant changes. Higher risk.',     cost: '$12,000' },
          { type: 'facelift', label: 'Facelift',         desc: 'Reduce visible signs of aging.',        cost: '$7,500' },
        ]
        return surgeries.map(s => (
          <Btn key={s.type} disabled={noActions} onClick={() => go(() => getPlasticSurgery(s.type))} title={s.label} subtitle={s.desc} cost={s.cost} />
        ))
      }

      case 'race_tracks': {
        const raceHorses = ['Thunderhooves', 'Lucky Lightning', 'Desert Rose', 'Iron Maiden', 'Golden Gallop']
        return (
          <>
            <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1 py-1">🏇 Pick a Horse</p>
            {raceHorses.map((horse, i) => (
              <button
                key={i}
                onClick={() => setHorseIdx(i)}
                className="w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-semibold active:scale-95"
                style={{
                  background: horseIdx === i ? 'linear-gradient(135deg,#ff9500,#ff6b00)' : 'white',
                  color: horseIdx === i ? 'white' : '#3a3a3c',
                  borderColor: horseIdx === i ? '#ff9500' : '#e5e5ea',
                }}
              >
                #{i + 1} — {horse} {horseIdx === i ? '✓' : ''}
              </button>
            ))}
            <div className="pt-2 space-y-2">
              <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">Bet Amount</p>
              <div className="flex gap-2">
                {[50, 200, 500, 1000].map(amt => (
                  <button key={amt} onClick={() => setBetAmount(amt)}
                    className="flex-1 py-2 text-xs font-bold rounded-xl border transition-all active:scale-95"
                    style={{
                      background: betAmount === amt ? '#007aff' : 'white',
                      color: betAmount === amt ? 'white' : '#8e8e93',
                      borderColor: betAmount === amt ? '#007aff' : '#e5e5ea',
                    }}>
                    ${amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={betAmount}
                onChange={e => setBetAmount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-sm"
                placeholder="Custom amount"
              />
            </div>
            <div className="pt-1">
              <button
                disabled={noActions || (state.money ?? 0) < betAmount}
                onClick={() => go(() => betOnHorses(horseIdx, betAmount))}
                className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all active:scale-95 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#34c759,#28a046)' }}
              >
                🎰 Bet ${betAmount.toLocaleString()} on {raceHorses[horseIdx]}
              </button>
              <p className="text-center text-xs text-natalis-muted mt-1">5× payout if your horse wins · Balance: ${(state.money ?? 0).toLocaleString()}</p>
            </div>
          </>
        )
      }

      case 'rehab': {
        return (
          <>
            {hasAddiction
              ? <Btn disabled={noActions} onClick={() => go(goToRehab)} title="Enter Rehab" subtitle="Treat your addiction. Not cheap, but necessary." cost="Cost: $5,000–$25,000" />
              : <p className="text-natalis-muted text-sm italic p-3">No active addictions to treat.</p>
            }
            {(ACTIVITIES.body ?? []).filter(a => a.id === 'quit_smoking' || a.id === 'rehabilitation').filter(a => !a.condition || a.condition(G)).map(a => (
              <Btn key={a.id} disabled={noActions} onClick={() => go(() => takeActivity(a.id))} title={a.name} subtitle={a.description} />
            ))}
          </>
        )
      }

      case 'pets': {
        const adoptionFees = { dog: 400, cat: 200, rabbit: 80, hamster: 30, parrot: 300, fish: 20, bird: 150 }
        const livePets = (state.pets ?? []).filter(p => p.alive)
        return (
          <>
            {livePets.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Your Pets</p>
                {livePets.map(pet => {
                  const allIdx = (state.pets ?? []).indexOf(pet)
                  return (
                    <Btn key={allIdx} disabled={noActions} onClick={() => go(() => visitVet(allIdx))} title={`Take ${pet.name} to the Vet`} subtitle={`${pet.species} · Age ${pet.age}`} cost="$150–$600" />
                  )
                })}
              </>
            )}
            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Adopt a Pet</p>
            {Object.entries(adoptionFees).map(([species, cost]) => (
              <Btn key={species} disabled={noActions || (state.money ?? 0) < cost} onClick={() => go(() => adoptPet(species))} title={`Adopt a ${species.charAt(0).toUpperCase() + species.slice(1)}`} subtitle="Give an animal a loving home." cost={`Adoption fee: $${cost}`} />
            ))}
          </>
        )
      }

      case 'licenses': {
        const hasDriver  = state.flags.includes('has_licence')
        const hasPilot   = state.flags.includes('pilot_licence')
        const hasBoating = state.flags.includes('boating_licence')
        return (
          <>
            <Btn disabled={noActions || hasDriver || state.age < 16} onClick={() => go(() => obtainLicense('driver'))} title={hasDriver ? "Driver's Licence ✓" : "Get Driver's Licence"} subtitle={hasDriver ? "Already obtained." : "Required to own & drive cars."} cost="$500" />
            <Btn disabled={noActions || hasPilot || state.age < 18} onClick={() => go(() => obtainLicense('pilot'))} title={hasPilot ? "Pilot's Licence ✓" : "Get Pilot's Licence"} subtitle={hasPilot ? "Already obtained." : "Required to fly aircraft."} cost="$8,000" />
            <Btn disabled={noActions || hasBoating || state.age < 16} onClick={() => go(() => obtainLicense('boating'))} title={hasBoating ? "Boating Licence ✓" : "Get Boating Licence"} subtitle={hasBoating ? "Already obtained." : "Required to operate boats."} cost="$600" />
          </>
        )
      }

      case 'assets': {
        const properties = state.assets?.properties ?? []
        const vehicles = state.assets?.vehicles ?? []
        return (
          <>
            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Buy Property</p>
            {PROPERTY_TYPES.map(type => {
              const downPayment = Math.round(type.basePrice * type.downPaymentRate)
              return (
                <Btn key={type.id} disabled={noActions || (state.money ?? 0) < downPayment || state.age < 18}
                  onClick={() => { buyProperty(type.id); onClose() }}
                  title={type.name} subtitle={type.description}
                  cost={`~$${type.basePrice.toLocaleString()} · Deposit: $${downPayment.toLocaleString()}`} />
              )
            })}
            {properties.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Sell Property</p>
                {properties.map((p, i) => (
                  <Btn key={i} onClick={() => { sellProperty(i); onClose() }} title={`Sell ${p.name}`} subtitle={`Value: $${p.currentValue.toLocaleString()}${p.mortgage > 0 ? ` · Mortgage: $${p.mortgage.toLocaleString()}` : ''}`} danger />
                ))}
              </>
            )}
            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Buy Vehicle</p>
            {VEHICLE_TYPES.filter(t => t.id === 'bicycle' || state.licenceObtained).map(type => (
              <Btn key={type.id} disabled={noActions || (state.money ?? 0) < type.basePrice}
                onClick={() => { buyVehicle(type.id); onClose() }}
                title={type.name} subtitle={type.description}
                cost={`~$${type.basePrice.toLocaleString()} · Maint: $${type.annualMaintenance.toLocaleString()}/yr`} />
            ))}
            {vehicles.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Sell Vehicle</p>
                {vehicles.map((v, i) => (
                  <Btn key={i} onClick={() => { sellVehicle(i); onClose() }} title={`Sell ${v.name}`} subtitle={`Value: $${v.currentValue.toLocaleString()}`} danger />
                ))}
              </>
            )}
          </>
        )
      }

      case 'money': {
        const moneyActivities = ACTIVITIES.money ?? []
        return moneyActivities
          .filter(a => (!a.minAge || state.age >= a.minAge) && (!a.maxAge || state.age <= a.maxAge))
          .filter(a => !a.condition || a.condition(G))
          .map(a => (
            <Btn key={a.id} disabled={noActions} onClick={() => go(() => takeActivity(a.id))} title={a.name} subtitle={a.description} cost={a.cost > 0 ? `Cost: $${a.cost.toLocaleString()}` : null} />
          ))
      }

      case 'crime': {
        const crimeRefs = ACTIVITIES.crime ?? []
        return crimeRefs
          .filter(ref => !ref.minAge || state.age >= ref.minAge)
          .map(ref => {
            const crime = CRIMES.find(c => c.id === ref.crimeId)
            if (!crime) return null
            if (crime.requiresFlag && !state.flags.includes(crime.requiresFlag)) return null
            const canAfford = !crime.wealthRequirement || state.character?.wealthTier >= crime.wealthRequirement
            const handleCrime = () => {
              if (crime.minigame) {
                onClose()
                triggerMinigame({
                  ...crime.minigame,
                  onSuccess: {
                    outcome: crime.minigame.successOutcome ?? 'You pull it off.',
                    effect: (s) => {
                      const next = { ...s }
                      next.money = (next.money ?? 0) + (crime.incomeEstimate ?? 0)
                      next.karma = Math.max(0, (next.karma ?? 50) + (crime.karmaHit ?? -10))
                      next.log = [...(next.log ?? []), { age: s.age, text: `You committed ${crime.name}.`, isKey: true }]
                      return next
                    },
                  },
                  onFailure: {
                    outcome: crime.minigame.failOutcome ?? 'You are caught.',
                    effect: (s) => {
                      const sentence = Array.isArray(crime.sentence)
                        ? crime.sentence[0] + Math.floor(Math.random() * (crime.sentence[1] - crime.sentence[0]))
                        : (crime.sentence ?? 1)
                      return {
                        ...s,
                        inPrison: true,
                        prisonSentence: sentence,
                        criminalRecord: [...(s.criminalRecord ?? []), crime.name],
                        log: [...(s.log ?? []), { age: s.age, text: `Arrested for ${crime.name}. Sentenced to ${sentence} year${sentence !== 1 ? 's' : ''}.`, isKey: true }],
                      }
                    },
                  },
                })
              } else {
                go(() => commitCrime(crime.id))
              }
            }
            return (
              <Btn key={crime.id} disabled={noActions || !canAfford}
                onClick={handleCrime}
                title={`${crime.minigame ? '🎮 ' : ''}${crime.name}`}
                subtitle={crime.description}
                cost={`Arrest risk: ${Math.round(crime.arrestRisk * 100)}%`}
                danger />
            )
          })
      }

      case 'career': {
        const available = getAvailableCareers(state)
        return (
          <>
            {state.career && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Current: {state.career.title}</p>
                <Btn onClick={() => go(workHarder)} title="Work Harder" subtitle="Extra effort. Costs health and happiness." />
                <Btn onClick={() => go(schmoozeBoss)} title="Schmooze the Boss" subtitle="Charisma-based. Results vary." />
                <Btn onClick={() => go(askForRaise)} title="Ask for a Raise" subtitle="Performance and charisma determine success." />
                <Btn onClick={() => go(quitJob)} title="Quit Your Job" subtitle={`Leave your position as ${state.career.title}.`} danger />
              </>
            )}
            {state.age >= 55 && !state.retired && (
              <Btn onClick={() => go(retire)} title="Retire" subtitle="End your working life on your own terms." />
            )}
            {available.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Available Careers</p>
                {available.map(career => (
                  <Btn key={career.id} onClick={() => { enterCareer(career.id); onClose() }}
                    title={`${career.levels[0].title}${career.partTime ? ' (part-time)' : ''}`}
                    subtitle={career.description}
                    cost={`$${career.levels[0].salaryRange[0].toLocaleString()}–$${career.levels[0].salaryRange[1].toLocaleString()}/yr`} />
                ))}
              </>
            )}
            {available.length === 0 && !state.career && (
              <p className="text-natalis-muted text-sm italic p-3">No careers available for your current qualifications.</p>
            )}
          </>
        )
      }

      case 'friends': {
        const friends = state.friends ?? []
        const aliveFriends = friends.filter(f => f.alive)
        if (aliveFriends.length === 0) {
          return <p className="text-natalis-muted text-sm italic p-3">You don't have any friends yet. Go to events, school, or work to meet people.</p>
        }
        return aliveFriends.map((friend, i) => {
          const realIdx = friends.indexOf(friend)
          const q = friend.relationshipQuality
          const qColor = q > 65 ? '#34c759' : q > 35 ? '#ff9500' : '#ff3b30'
          return (
            <div key={i} className="bg-white rounded-xl border border-natalis-border p-4 space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <p className="text-natalis-text text-sm font-semibold">{friend.name}</p>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-natalis-bg rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${q}%`, backgroundColor: qColor }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: qColor }}>{q}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { action: 'hangout',    label: '🤝 Hang Out',   cost: '$30' },
                  { action: 'compliment', label: '😊 Compliment', cost: 'Free' },
                  { action: 'gift',       label: '🎁 Gift',       cost: '$100' },
                  { action: 'prank',      label: '😈 Prank',      cost: 'Free' },
                ].map(act => (
                  <button key={act.action} disabled={noActions}
                    onClick={() => go(() => interactWithFriend(realIdx, act.action))}
                    className="py-2 px-3 rounded-xl border border-natalis-border bg-natalis-bg text-xs font-semibold text-natalis-text hover:bg-blue-50 hover:border-bit-blue disabled:opacity-40 disabled:cursor-not-allowed transition-all text-center active:scale-95">
                    {act.label}<br /><span className="text-natalis-muted font-normal">{act.cost}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })
      }

      case 'substances': {
        const isAddict = state.flags.includes('alcohol_addiction') || state.flags.includes('drug_addiction')
        return (
          <>
            {isAddict && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-1">
                <span className="text-lg">⚠️</span>
                <p className="text-xs font-semibold text-bit-red">Active addiction. Consider rehab.</p>
              </div>
            )}
            <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1 py-1">Alcohol</p>
            <Btn disabled={noActions} onClick={() => go(() => useSubstance('alcohol'))} title="Have a Drink" subtitle="Relax with alcohol." cost="~$30" />
            {state.age >= 16 && (
              <>
                <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1 pt-2">Drugs</p>
                <Btn disabled={noActions} onClick={() => go(() => useSubstance('cannabis'))} title="Smoke Cannabis" subtitle="Mild. Still a choice with consequences." cost="~$40" />
                {state.age >= 18 && (
                  <>
                    <Btn disabled={noActions} onClick={() => go(() => useSubstance('pills'))} title="Take Pills" subtitle="Prescription or otherwise." cost="~$60" danger />
                    <Btn disabled={noActions} onClick={() => go(() => useSubstance('cocaine'))} title="Use Cocaine" subtitle="High risk of addiction. Serious health cost." cost="~$200" danger />
                    <Btn disabled={noActions} onClick={() => go(() => useSubstance('heroin'))} title="Use Heroin" subtitle="Extreme addiction and overdose risk." cost="~$150" danger />
                  </>
                )}
              </>
            )}
          </>
        )
      }

      case 'hobbies': {
        const hobbyActivities = ACTIVITIES.hobbies ?? []
        return hobbyActivities
          .filter(a => {
            if (a.minAge && state.age < a.minAge) return false
            if (a.minYear && (state.currentYear ?? 0) < a.minYear) return false
            return true
          })
          .map(a => (
            <Btn key={a.id} disabled={noActions}
              onClick={() => go(() => takeActivity(a.id))}
              title={`${a.emoji} ${a.label}`}
              subtitle={a.desc}
              cost={a.cost > 0 ? `$${a.cost}` : 'Free'}
            />
          ))
      }

      default:
        return <p className="text-natalis-muted text-sm italic p-3">Select a category.</p>
    }
  }

  // ── Main render ───────────────────────────────────────────────────────────────

  return (
    <div className="bg-natalis-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-natalis-border bg-white">
        <div className="flex items-center gap-2">
          {activeTop && (
            <button onClick={() => setActiveTop(null)} className="text-bit-blue font-semibold text-sm mr-1">← Back</button>
          )}
          <p className="font-bold text-natalis-text text-sm">
            {activeTop ? TOP_CATEGORIES.find(c => c.key === activeTop)?.label : '⚡ Activities'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {Array.from({ length: state.maxActionsPerYear }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: i < state.actionsThisYear ? '#e5e5ea' : '#007aff' }} />
            ))}
          </div>
          <button onClick={onClose} className="text-natalis-muted text-lg leading-none">✕</button>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
        {!activeTop ? (
          /* Top-level category list — BitLife style */
          <div className="p-3 space-y-1.5">
            {TOP_CATEGORIES.map(cat => {
              if (cat.key === 'nightlife' && state.age < 18) return null
              if (cat.key === 'fertility' && state.age < 14) return null
              if (cat.key === 'plastic_surg' && state.age < 18) return null
              if (cat.key === 'licenses' && state.age < 16) return null
              if (cat.key === 'race_tracks' && state.age < 18) return null
              if (cat.key === 'shopping' && state.age < 8) return null
              if (cat.key === 'social_media' && state.age < 13) return null
              if (cat.key === 'career' && state.age < 14) return null
              if (cat.key === 'love' && state.age < 13) return null
              if (cat.key === 'assets' && state.age < 18) return null
              if (cat.key === 'money' && state.age < 14) return null
              if (cat.key === 'rehab' && !hasAddiction && !(ACTIVITIES.body ?? []).some(a => (a.id === 'quit_smoking' || a.id === 'rehabilitation') && (!a.condition || a.condition(G)))) return null
              if (cat.key === 'substances' && state.age < 14) return null

              const badge = cat.key === 'rehab' && hasAddiction ? { text: '!', color: '#ff3b30' } :
                            cat.key === 'social_media' && sm.followers > 0 ? { text: sm.followers >= 1000 ? `${(sm.followers/1000).toFixed(0)}k` : sm.followers.toString(), color: '#007aff' } :
                            cat.key === 'friends' && (state.friends ?? []).filter(f => f.alive).length > 0 ? { text: (state.friends ?? []).filter(f => f.alive).length.toString(), color: '#34c759' } :
                            null

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTop(cat.key)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-natalis-border hover:border-bit-blue hover:bg-blue-50 transition-all active:scale-95 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl w-8 text-center">{cat.emoji}</span>
                    <div className="text-left">
                      <p className="font-semibold text-natalis-text text-sm">{cat.label}</p>
                      <p className="text-natalis-muted text-xs">{cat.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {badge && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: badge.color }}>
                        {badge.text}
                      </span>
                    )}
                    <span className="text-natalis-muted text-base">›</span>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          /* Sub-panel */
          <div className="p-3 space-y-2">
            {renderSub()}
          </div>
        )}
      </div>
    </div>
  )
}

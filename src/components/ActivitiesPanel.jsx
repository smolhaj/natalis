import { useState, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { ACTIVITIES } from '../data/activities'
import { DESTINATIONS } from '../data/destinations'
import { CRIMES } from '../data/crimes'
import { COUNTRIES } from '../data/countries'
import { PROPERTY_TYPES, VEHICLE_TYPES } from '../data/assets'
import { getAvailableCareers, dropOutOfSchool, BUSINESS_TYPES, getAvailableBusinessTypes, getPhase } from '../engine/gameEngine'
import { CAREERS } from '../data/careers'

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
  { key: 'business',      label: 'Business',         emoji: '🏢', desc: 'Run your own company' },
  { key: 'friends',       label: 'Friends',          emoji: '👥', desc: 'Your social circle' },
  { key: 'travel',        label: 'Travel',           emoji: '✈️',  desc: 'See the world' },
  { key: 'immigration',   label: 'Immigration',       emoji: '🛂', desc: 'Residency & citizenship' },
  { key: 'underground',   label: 'Go Underground',   emoji: '🕵️', desc: 'Evade the law' },
  { key: 'prison',        label: 'Prison Life',       emoji: '🔒', desc: 'Activities inside' },
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
  const [murderStep, setMurderStep] = useState(null) // null | 'victim' | 'method'
  const [murderVictim, setMurderVictim] = useState(null)
  const [assaultStep, setAssaultStep] = useState(null) // null | 'victim'
  const [assaultVictim, setAssaultVictim] = useState(null)
  const [assaultCrimeId, setAssaultCrimeId] = useState('assault')
  const [datingAppStep, setDatingAppStep] = useState(null) // null | 'filters' | 'match'
  const [datingFilters, setDatingFilters] = useState({ ageRange: 'any', netWorth: 'any' })

  const state = useGameStore(s => s)

  // Auto-open the Prison Life tab when in prison so the user doesn't have to hunt for it
  useEffect(() => {
    if (state.inPrison && !activeTop) setActiveTop('prison')
  }, [state.inPrison, activeTop])
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
  const bookTrip           = useGameStore(s => s.bookTrip)
  const startBusiness      = useGameStore(s => s.startBusiness)
  const manageBusiness     = useGameStore(s => s.manageBusiness)
  const hireEmployee       = useGameStore(s => s.hireEmployee)
  const closeBusiness      = useGameStore(s => s.closeBusiness)
  const confirmBreakOut    = useGameStore(s => s.confirmBreakOut)
  const assumeIdentity     = useGameStore(s => s.assumeIdentity)
  const goIllegal          = useGameStore(s => s.goIllegal)
  const doPrisonWork       = useGameStore(s => s.doPrisonWork)
  const doPrisonCry        = useGameStore(s => s.doPrisonCry)
  const doPrisonConjugalVisit = useGameStore(s => s.doPrisonConjugalVisit)
  const doPrisonBribeGuard = useGameStore(s => s.doPrisonBribeGuard)
  const doPrisonStartRiot  = useGameStore(s => s.doPrisonStartRiot)
  const pendingPartner     = useGameStore(s => s.pendingPartner)
  const acceptPartner      = useGameStore(s => s.acceptPartner)
  const declinePartner     = useGameStore(s => s.declinePartner)
  const useDatingApp       = useGameStore(s => s.useDatingApp)
  const doUpgradeResidency = useGameStore(s => s.upgradeResidency)
  const doSeekAsylum       = useGameStore(s => s.seekAsylum)
  const doEmigrate         = useGameStore(s => s.emigrate)
  const takePaydayLoan     = useGameStore(s => s.takePaydayLoan)
  const applyForBenefits   = useGameStore(s => s.applyForBenefits)
  const declareBankruptcy  = useGameStore(s => s.declareBankruptcy)

  const actionsLeft = state.maxActionsPerYear - state.actionsThisYear
  const noActions = actionsLeft <= 0
  const G = { character: state.character, stats: state.stats, flags: state.flags, age: state.age, career: state.career, education: state.education, inPrison: state.inPrison, partner: state.partner, regret: state.regret ?? 50, siblings: state.siblings ?? [], children: state.children ?? [], money: state.money ?? 0, assets: state.assets ?? { properties: [], vehicles: [] }, currentYear: state.currentYear }

  const phase = getPhase(state.age)
  const conditions = state.conditions ?? []
  const hasCondition = (id) => conditions.some(c => c.id === id)
  const hasSevereUnmanaged = (id) => conditions.some(c => c.id === id && c.severity === 'severe' && !c.managed)
  const anySevereUnmanaged = conditions.some(c => c.severity === 'severe' && !c.managed)
  const isHomeless = state.mem?.isHomeless === true

  const CONDITION_LABELS = {
    diabetes_type1: 'Type 1 Diabetes', diabetes_type2: 'Type 2 Diabetes',
    heart_disease: 'Heart Disease', copd: 'COPD', cancer_treatment: 'Cancer',
    back_pain: 'Back Pain', back_pain_chronic: 'Chronic Back Pain',
    hiv_early: 'HIV', hiv_aids: 'HIV/AIDS', vision_loss: 'Vision Loss',
    hearing_loss: 'Hearing Loss', depression_chronic: 'Chronic Depression',
    disability_injury: 'Physical Disability',
  }

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
            {/* Conditions overview */}
            {conditions.length > 0 && (
              <div className="bg-amber-50 rounded-xl border border-amber-200 px-4 py-3 mb-1">
                <p className="text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">Your conditions</p>
                {conditions.map(c => (
                  <p key={c.id} className="text-xs text-amber-700">
                    {CONDITION_LABELS[c.id] ?? c.id} — <span className="font-semibold">{c.severity}</span>{c.managed ? ' · managed' : ' · unmanaged'}
                  </p>
                ))}
              </div>
            )}
            {/* Gym */}
            {state.age >= 16 && (
              <>
                {(hasSevereUnmanaged('heart_disease') || hasSevereUnmanaged('copd')) && (
                  <div className="bg-red-50 rounded-xl border border-red-200 px-3 py-2 mb-1 text-xs text-red-700">
                    ⚠️ Intense exercise carries real risk with your condition. Consider therapy or walking instead.
                  </div>
                )}
                <Btn disabled={noActions || hasSevereUnmanaged('disability_injury')}
                  onClick={() => go(() => takeActivity('gym'))}
                  title="Go to the Gym"
                  subtitle={hasSevereUnmanaged('disability_injury') ? "Not possible with your current injury." : "Improve your fitness and health."}
                  cost="Cost: $20/visit"
                />
              </>
            )}
            {/* Walk */}
            {state.age >= 6 && <Btn disabled={noActions} onClick={() => go(() => takeActivity('walk'))} title="Go for a Walk" subtitle="Clear your head and move your body." />}
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
            {/* STI Treatment */}
            {state.flags.includes('has_std') && (
              <Btn disabled={noActions} onClick={() => go(() => takeActivity('treat_sti'))} title="🏥 Treat STI" subtitle="See a doctor and start treatment." cost="$300" danger />
            )}
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
        const isGraduate = state.education?.level === 'university'
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
            {state.age >= 10 && state.age <= 18 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Extracurriculars</p>
                {(ACTIVITIES.extracurricular ?? [])
                  .filter(a => state.age >= (a.minAge ?? 0) && state.age <= (a.maxAge ?? 99))
                  .filter(a => !a.minYear || (state.currentYear ?? 0) >= a.minYear)
                  .map(a => {
                    const joined = state.flags.includes(a.id.replace('_school', '').replace('volunteer_school', 'volunteer'))
                    return (
                      <Btn key={a.id} disabled={noActions}
                        onClick={() => go(() => takeActivity(a.id))}
                        title={`${joined ? '✓ ' : ''}${a.name}`}
                        subtitle={a.desc ?? a.description}
                      />
                    )
                  })
                }
              </>
            )}
          </>
        )
      }

      case 'love': {
        // ── Partner profile card (organic meet or dating app match) ──────────
        const PartnerProfileCard = ({ profile, onAccept, onDecline, acceptLabel = 'Go on a Date', declineLabel = 'Not Interested' }) => {
          const genderEmojis = { male: '👨', female: '👩', 'non-binary': '🧑' }
          const faceEmoji = genderEmojis[profile.gender] ?? '🧑'
          const StatBarRow = ({ label, value, color }) => (
            <div className="flex items-center gap-2">
              <span className="text-xs text-natalis-muted w-16 shrink-0">{label}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
              </div>
              <span className="text-xs font-bold w-8 text-right" style={{ color }}>{value}</span>
            </div>
          )
          return (
            <div className="bg-white rounded-2xl border border-natalis-border shadow-sm overflow-hidden mb-2">
              {/* Header */}
              <div className="bg-gradient-to-br from-pink-500 to-rose-400 px-5 py-4 flex items-center gap-4">
                <span className="text-5xl">{faceEmoji}</span>
                <div>
                  <p className="text-white font-bold text-lg leading-tight">{profile.name}</p>
                  <p className="text-pink-100 text-xs mt-0.5">{profile.occupation}</p>
                </div>
              </div>
              {/* Info fields */}
              <div className="px-4 pt-3 pb-1 grid grid-cols-2 gap-x-4 gap-y-1.5">
                <div>
                  <p className="text-natalis-muted text-xs">Gender</p>
                  <p className="text-natalis-text text-sm font-semibold capitalize">{profile.gender}</p>
                </div>
                <div>
                  <p className="text-natalis-muted text-xs">Birth Gender</p>
                  <p className="text-natalis-text text-sm font-semibold capitalize">{profile.birthGender}</p>
                </div>
                <div>
                  <p className="text-natalis-muted text-xs">Age</p>
                  <p className="text-natalis-text text-sm font-semibold">{profile.age}</p>
                </div>
                <div>
                  <p className="text-natalis-muted text-xs">Occupation</p>
                  <p className="text-natalis-text text-sm font-semibold truncate">{profile.occupation}</p>
                </div>
              </div>
              {/* Stat bars */}
              <div className="px-4 pt-2 pb-3 space-y-2">
                <StatBarRow label="Looks" value={profile.looks} color="#ff6b81" />
                <StatBarRow label="Smarts" value={profile.smarts} color="#007aff" />
                <StatBarRow label="Money" value={profile.wealthStat} color="#34c759" />
                <StatBarRow label="Craziness" value={profile.craziness} color="#ff9500" />
              </div>
              {/* Action buttons */}
              <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                <button
                  onClick={onAccept}
                  className="py-3 rounded-xl font-bold text-white text-sm active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg,#ff6b81,#c44569)' }}
                >
                  {acceptLabel}
                </button>
                <button
                  onClick={onDecline}
                  className="py-3 rounded-xl font-bold text-sm border border-natalis-border bg-natalis-bg text-natalis-muted active:scale-95 transition-all"
                >
                  {declineLabel}
                </button>
              </div>
            </div>
          )
        }

        // ── Pending partner (organic meet) ───────────────────────────────────
        if (pendingPartner && !state.partner) {
          return (
            <>
              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1 mb-1">You meet someone...</p>
              <PartnerProfileCard
                profile={pendingPartner}
                acceptLabel="Start Dating"
                declineLabel="Not Interested"
                onAccept={() => { acceptPartner(); onClose() }}
                onDecline={() => declinePartner()}
              />
            </>
          )
        }

        // ── Dating app flow ──────────────────────────────────────────────────
        const AGE_RANGES = [
          { label: 'Any age', value: 'any' },
          { label: '18–25', value: '18-25', minAge: 18, maxAge: 25 },
          { label: '26–35', value: '26-35', minAge: 26, maxAge: 35 },
          { label: '36–45', value: '36-45', minAge: 36, maxAge: 45 },
          { label: '46–55', value: '46-55', minAge: 46, maxAge: 55 },
          { label: '56+',   value: '56+',  minAge: 56, maxAge: 80 },
        ]
        const NET_WORTH_OPTIONS = [
          { label: "It doesn't matter", value: 'any' },
          { label: 'Some savings ($10k+)', value: 'some', minWealthStat: 30 },
          { label: 'Comfortable ($100k+)', value: 'comfortable', minWealthStat: 55 },
          { label: 'Wealthy ($1M+)', value: 'wealthy', minWealthStat: 80 },
        ]

        if (datingAppStep === 'filters') {
          const selectedAge = AGE_RANGES.find(r => r.value === datingFilters.ageRange) ?? AGE_RANGES[0]
          const selectedNW = NET_WORTH_OPTIONS.find(r => r.value === datingFilters.netWorth) ?? NET_WORTH_OPTIONS[0]
          return (
            <>
              <button onClick={() => setDatingAppStep(null)} className="text-bit-blue text-sm font-semibold mb-3">← Back</button>
              {/* Dating app header card */}
              <div className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl px-5 py-4 mb-4 text-white">
                <p className="font-bold text-lg">💘 Dating App</p>
                <p className="text-pink-100 text-xs mt-0.5">$100 per search · Find your match</p>
              </div>

              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Pick your desired age</p>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                {AGE_RANGES.map(r => (
                  <button key={r.value} onClick={() => setDatingFilters(f => ({ ...f, ageRange: r.value }))}
                    className="py-2 px-2 rounded-xl border text-xs font-semibold transition-all active:scale-95"
                    style={{
                      background: datingFilters.ageRange === r.value ? '#ff6b81' : 'white',
                      color: datingFilters.ageRange === r.value ? 'white' : '#8e8e93',
                      borderColor: datingFilters.ageRange === r.value ? '#ff6b81' : '#e5e5ea',
                    }}>
                    {r.label}
                  </button>
                ))}
              </div>

              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Pick your desired net worth</p>
              <div className="space-y-1.5 mb-4">
                {NET_WORTH_OPTIONS.map(r => (
                  <button key={r.value} onClick={() => setDatingFilters(f => ({ ...f, netWorth: r.value }))}
                    className="w-full text-left px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all active:scale-95"
                    style={{
                      background: datingFilters.netWorth === r.value ? '#fff0f3' : 'white',
                      color: datingFilters.netWorth === r.value ? '#c44569' : '#3a3a3c',
                      borderColor: datingFilters.netWorth === r.value ? '#ff6b81' : '#e5e5ea',
                    }}>
                    {r.label}
                    {datingFilters.netWorth === r.value && <span className="float-right text-pink-400">✓</span>}
                  </button>
                ))}
              </div>

              <button
                disabled={noActions || (state.money ?? 0) < 100}
                onClick={() => {
                  const ageOpts = AGE_RANGES.find(r => r.value === datingFilters.ageRange) ?? {}
                  const nwOpts = NET_WORTH_OPTIONS.find(r => r.value === datingFilters.netWorth) ?? {}
                  useDatingApp({ minAge: ageOpts.minAge, maxAge: ageOpts.maxAge, minWealthStat: nwOpts.minWealthStat })
                  setDatingAppStep('match')
                }}
                className="w-full py-3 rounded-xl font-bold text-white text-sm active:scale-95 disabled:opacity-40 transition-all"
                style={{ background: 'linear-gradient(135deg,#ff6b81,#c44569)' }}
              >
                💘 Let's try it · ${(state.money ?? 0) >= 100 ? '100' : 'Need $100'}
              </button>
            </>
          )
        }

        if (datingAppStep === 'match' && pendingPartner) {
          return (
            <>
              <button onClick={() => { setDatingAppStep('filters'); declinePartner() }} className="text-bit-blue text-sm font-semibold mb-2">← New Match</button>
              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1 mb-1">Your match</p>
              <PartnerProfileCard
                profile={pendingPartner}
                acceptLabel="Go on a Date"
                declineLabel="No, try again"
                onAccept={() => { acceptPartner(); setDatingAppStep(null); onClose() }}
                onDecline={() => {
                  declinePartner()
                  setDatingAppStep('filters')
                }}
              />
            </>
          )
        }

        if (datingAppStep === 'match' && !pendingPartner) {
          setDatingAppStep(null)
        }

        return (
          <>
            {isHomeless && (
              <div className="bg-amber-50 rounded-xl border border-amber-200 px-3 py-2 mb-2 text-xs text-amber-700">
                Without a stable address, meeting someone new is harder. Most dating apps require a fixed location.
              </div>
            )}
            {state.age >= 16 && !state.partner && (
              <>
                <Btn disabled={noActions || isHomeless} onClick={() => meetSomeone()} title="Meet Someone New" subtitle={isHomeless ? "Not possible without a stable address." : "Put yourself out there."} />
                {state.age >= 18 && (
                  <Btn
                    disabled={noActions || (state.money ?? 0) < 100}
                    onClick={() => setDatingAppStep('filters')}
                    title="💘 Dating App"
                    subtitle="Browse matches with filters."
                    cost="$100 per search"
                  />
                )}
              </>
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
        const SM_GENRES = [
          { id: 'comedy',    label: 'Comedy',    emoji: '😂', desc: 'Relatable and funny content.' },
          { id: 'lifestyle', label: 'Lifestyle', emoji: '✨', desc: 'Fashion, travel, aspirational living.' },
          { id: 'gaming',    label: 'Gaming',    emoji: '🎮', desc: 'Gameplay, reviews, streaming.' },
          { id: 'fitness',   label: 'Fitness',   emoji: '💪', desc: 'Workouts, health, wellness.' },
          { id: 'beauty',    label: 'Beauty',    emoji: '💄', desc: 'Makeup, skincare, style.' },
          { id: 'politics',  label: 'Politics',  emoji: '📢', desc: 'Opinions and commentary.' },
          { id: 'music',     label: 'Music',     emoji: '🎵', desc: 'Covers, originals, music talk.' },
          { id: 'food',      label: 'Food',      emoji: '🍜', desc: 'Recipes, restaurants, cooking.' },
        ]
        const setGenre = (genreId) => useGameStore.getState().set?.({ socialMedia: { ...sm, genre: genreId } }) ?? useGameStore.setState({ socialMedia: { ...sm, genre: genreId } })
        return (
          <>
            <div className="flex items-center justify-between bg-white rounded-xl border border-natalis-border px-4 py-3 mb-1">
              <span className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">📱 Followers</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-natalis-text text-sm">{sm.followers.toLocaleString()}</span>
                {sm.verified && <span className="text-xs font-bold text-white bg-bit-blue px-2 py-0.5 rounded-full">✓ Verified</span>}
                {sm.genre && <span className="text-xs font-bold text-white bg-pink-500 px-2 py-0.5 rounded-full capitalize">{sm.genre}</span>}
              </div>
            </div>
            {!sm.genre && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Pick your content niche</p>
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  {SM_GENRES.map(g => (
                    <button key={g.id}
                      onClick={() => useGameStore.setState({ socialMedia: { ...sm, genre: g.id } })}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-natalis-border bg-white text-left text-xs font-semibold text-natalis-text hover:border-bit-blue hover:bg-blue-50 active:scale-95 transition-all">
                      <span className="text-lg">{g.emoji}</span>
                      <div><p>{g.label}</p><p className="font-normal text-natalis-muted">{g.desc}</p></div>
                    </button>
                  ))}
                </div>
              </>
            )}
            {sm.genre && (
              <>
                <Btn disabled={noActions} onClick={() => go(postSocialMedia)} title="Post Content" subtitle={`Share ${sm.genre} content and grow your audience.`} />
                {sm.followers >= 5000 && (
                  <Btn disabled={noActions} onClick={() => go(promoteSocialMedia)} title="Promote a Product" subtitle="Earn money through sponsorships." cost="Requires 5k+ followers" />
                )}
                <Btn disabled={false} onClick={() => useGameStore.setState({ socialMedia: { ...sm, genre: null } })}
                  title="Change Niche" subtitle={`Currently: ${SM_GENRES.find(g => g.id === sm.genre)?.label ?? sm.genre}`} />
              </>
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
        return (
          <>
            {state.age >= 75 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-2 text-xs text-amber-800">
                ⚠️ At your age, surgical risk is elevated. Anaesthetic complications are more likely.
              </div>
            )}
            {(hasSevereUnmanaged('heart_disease') || hasSevereUnmanaged('copd')) && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-2 text-xs text-red-700">
                Surgery under general anaesthetic carries serious risk with your heart or lung condition.
              </div>
            )}
            {surgeries.map(s => (
              <Btn key={s.type} disabled={noActions} onClick={() => go(() => getPlasticSurgery(s.type))} title={s.label} subtitle={s.desc} cost={s.cost} />
            ))}
          </>
        )
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
            {isHomeless && (
              <div className="bg-amber-50 rounded-xl border border-amber-200 px-3 py-2 mb-2 text-xs text-amber-700">
                Property purchase requires proof of address. Resolve your housing situation first.
              </div>
            )}
            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Buy Property</p>
            {PROPERTY_TYPES.map(type => {
              const downPayment = Math.round(type.basePrice * type.downPaymentRate)
              return (
                <Btn key={type.id} disabled={noActions || (state.money ?? 0) < downPayment || state.age < 18 || isHomeless}
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
            {(() => {
              const TIER_LABELS = {
                bicycle: '🚲 Bicycles',
                motorcycle: '🏍️ Motorcycles',
                used_car: '🚗 Used Cars',
                new_car: '🚘 New Cars',
                luxury_car: '🏎️ Luxury Cars',
                supercar: '💎 Supercars',
                watercraft: '⛵ Watercraft',
              }
              const hasLicence = state.licenceObtained
              const tierKeys = ['bicycle', 'motorcycle', 'used_car', 'new_car', 'luxury_car', 'supercar', 'watercraft']
              return tierKeys.map(tier => {
                const tierVehicles = VEHICLE_TYPES.filter(t => {
                  if (t.tier !== tier) return false
                  if (tier === 'bicycle') return true
                  if (tier === 'watercraft') return hasLicence
                  return hasLicence
                }).filter(t => !t.minYear || (state.currentYear ?? 2000) >= t.minYear)
                if (tierVehicles.length === 0) return null
                return (
                  <div key={tier}>
                    <p className="text-natalis-muted text-xs font-semibold px-1 pt-2 pb-1">{TIER_LABELS[tier]}</p>
                    {tierVehicles.map(type => (
                      <Btn key={type.id} disabled={noActions || (state.money ?? 0) < type.basePrice}
                        onClick={() => { buyVehicle(type.id); onClose() }}
                        title={`${type.make} ${type.model}`}
                        subtitle={type.description}
                        cost={`~$${type.basePrice.toLocaleString()} · $${type.annualMaintenance.toLocaleString()}/yr`} />
                    ))}
                  </div>
                )
              })
            })()}
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
        const debt = state.debt ?? 0
        const money = state.money ?? 0
        const WELFARE_COUNTRIES = ['United States','United Kingdom','Australia','Germany','France','Canada','Netherlands','Sweden','Norway','Denmark','Finland','Ireland','New Zealand','Switzerland','Belgium','Austria']
        const hasWelfare = WELFARE_COUNTRIES.includes(state.character?.country?.name) || ['wealthy_west','wealthy_east','post_soviet'].includes(state.character?.country?.archetype)
        return (
          <>
            {/* Hardship section */}
            {state.age >= 18 && (
              <>
                {(debt > 8000 && money < 500) && (
                  <div className="bg-red-50 rounded-xl border border-red-200 px-3 py-2 mb-2 text-xs text-red-700">
                    ⚠️ Your debt is critical. You may qualify for bankruptcy protection.
                  </div>
                )}
                {money < 300 && state.age >= 18 && (
                  <Btn
                    danger
                    disabled={money >= 300}
                    onClick={() => { takePaydayLoan(); onClose() }}
                    title="Take a Payday Loan"
                    subtitle="$300 now. $420 owed at next due date. Annual rate: 400%+."
                    cost="Receive: $300 · Owe: $420"
                  />
                )}
                {!state.career && money < 500 && hasWelfare && (
                  <Btn
                    disabled={!!state.career || money >= 500}
                    onClick={() => { applyForBenefits(); onClose() }}
                    title="Apply for Government Benefits"
                    subtitle="Welfare, SNAP, Universal Credit, or equivalent. Requires no current employment."
                    cost="Receive: ~$400"
                  />
                )}
                {debt > 8000 && money < 500 && (
                  <Btn
                    danger
                    disabled={debt <= 8000 || money >= 500}
                    onClick={() => { declareBankruptcy(); onClose() }}
                    title="File for Bankruptcy"
                    subtitle="Wipes qualifying debt. Destroys your credit score. Removes non-exempt assets. A last resort."
                  />
                )}
              </>
            )}
            {moneyActivities
              .filter(a => (!a.minAge || state.age >= a.minAge) && (!a.maxAge || state.age <= a.maxAge))
              .filter(a => !a.condition || a.condition(G))
              .map(a => (
                <Btn key={a.id} disabled={noActions} onClick={() => go(() => takeActivity(a.id))} title={a.name} subtitle={a.description} cost={a.cost > 0 ? `Cost: $${a.cost.toLocaleString()}` : null} />
              ))
            }
          </>
        )
      }

      case 'crime': {
        // ── Stranger victim archetypes (assault + murder) ────────────────────
        // detectionMod: additive to base murder detection; arrestMod: additive to base arrest risk for assault
        const STRANGER_VICTIMS = [
          { label: 'A drunk person',        key: 'stranger_drunk',       emoji: '🍺', detectionMod: -0.07, arrestMod: -0.08, desc: 'Stumbling and oblivious.' },
          { label: 'A homeless person',     key: 'stranger_homeless',    emoji: '🏚️', detectionMod: -0.09, arrestMod: -0.10, desc: 'Unlikely anyone will notice.' },
          { label: 'A vagrant',             key: 'stranger_vagrant',     emoji: '🧳', detectionMod: -0.08, arrestMod: -0.09, desc: 'No fixed address. No witnesses.' },
          { label: 'A sex worker',          key: 'stranger_sexworker',   emoji: '💋', detectionMod: -0.04, arrestMod: -0.05, desc: 'Isolated and vulnerable.' },
          { label: 'A drug dealer',         key: 'stranger_dealer',      emoji: '💊', detectionMod: -0.03, arrestMod: -0.04, desc: 'Nobody asks questions in that world.' },
          { label: 'A tourist',             key: 'stranger_tourist',     emoji: '📷', detectionMod: +0.06, arrestMod: +0.07, desc: 'Their disappearance will be noticed.' },
          { label: 'A jogger',              key: 'stranger_jogger',      emoji: '🏃', detectionMod: +0.05, arrestMod: +0.06, desc: 'Their absence will be reported quickly.' },
          { label: 'An elderly person',     key: 'stranger_elderly',     emoji: '👴', detectionMod: +0.03, arrestMod: +0.00, desc: 'Frail. Extremely bad for your karma.' },
          { label: 'A businessman',         key: 'stranger_businessman', emoji: '💼', detectionMod: +0.10, arrestMod: +0.12, desc: 'High-profile. Expect a serious investigation.' },
          { label: 'A biker',               key: 'stranger_biker',       emoji: '🏍️', detectionMod: -0.02, arrestMod: -0.03, desc: 'Rough crowd — they sort their own.' },
          { label: 'A street performer',    key: 'stranger_performer',   emoji: '🎭', detectionMod: +0.04, arrestMod: +0.04, desc: 'Surrounded by crowds normally.' },
          { label: 'A random stranger',     key: 'stranger_random',      emoji: '👤', detectionMod:  0.00, arrestMod:  0.00, desc: 'Unknown risk profile.' },
        ]

        // Murder method detection rates (chance of being caught AFTER a successful kill)
        const MURDER_METHODS = [
          { name: 'Push Down Stairs',  detection: 0.12 },
          { name: 'Push Off Cliff',    detection: 0.12 },
          { name: 'Scare to Death',    detection: 0.05 },
          { name: 'Drown',             detection: 0.22 },
          { name: 'Elephant Laxative', detection: 0.22 },
          { name: 'Poison',            detection: 0.28 },
          { name: 'Hire a Hitman',     detection: 0.30 },
          { name: 'Electrocute',       detection: 0.32 },
          { name: 'Set on Fire',       detection: 0.38 },
          { name: 'Strangle Them',     detection: 0.42 },
          { name: 'Fastball to Head',  detection: 0.52 },
          { name: 'Drive-by Shooting', detection: 0.55 },
        ]

        const calcSentence = (c) => {
          if (!c?.sentence) return 1
          if (typeof c.sentence === 'object' && !Array.isArray(c.sentence)) {
            return c.sentence.min + Math.floor(Math.random() * (c.sentence.max - c.sentence.min + 1))
          }
          if (Array.isArray(c.sentence)) return c.sentence[0] + Math.floor(Math.random() * (c.sentence[1] - c.sentence[0]))
          return typeof c.sentence === 'number' ? c.sentence : 1
        }

        const killVictim = (next, victim) => {
          if (victim.key === 'partner') { next.partner = null }
          else if (victim.key === 'mother' && next.parents?.mother) { next.parents = { ...next.parents, mother: { ...next.parents.mother, alive: false } } }
          else if (victim.key === 'father' && next.parents?.father) { next.parents = { ...next.parents, father: { ...next.parents.father, alive: false } } }
          else if (victim.key?.startsWith('sibling_')) { const sibs = [...(next.siblings ?? [])]; if (sibs[victim.idx]) sibs[victim.idx] = { ...sibs[victim.idx], alive: false }; next.siblings = sibs }
          else if (victim.key?.startsWith('friend_')) { const frds = [...(next.friends ?? [])]; if (frds[victim.idx]) frds[victim.idx] = { ...frds[victim.idx], alive: false }; next.friends = frds }
          else if (victim.key?.startsWith('child_')) { const clds = [...(next.children ?? [])]; if (clds[victim.idx]) clds[victim.idx] = { ...clds[victim.idx], alive: false }; next.children = clds }
          else if (victim.key?.startsWith('ex_')) { const exs = [...(next.exPartners ?? [])]; if (exs[victim.idx]) exs[victim.idx] = { ...exs[victim.idx], alive: false }; next.exPartners = exs }
        }

        // ── Assault victim picker ────────────────────────────────────────────
        if (assaultStep === 'victim') {
          const assaultCrime = CRIMES.find(c => c.id === assaultCrimeId)
          const knownTargets = [
            ...(state.partner ? [{ label: `${state.partner.name} (Partner)`, key: 'known_partner', isKnown: true }] : []),
            ...(state.parents?.mother?.alive ? [{ label: `${state.parents.mother.name} (Mother)`, key: 'known_mother', isKnown: true }] : []),
            ...(state.parents?.father?.alive ? [{ label: `${state.parents.father.name} (Father)`, key: 'known_father', isKnown: true }] : []),
            ...((state.siblings ?? []).filter(s => s.alive).map((s, i) => ({ label: `${s.name} (Sibling)`, key: `known_sibling_${i}`, isKnown: true }))),
            ...((state.friends ?? []).filter(f => f.alive).map((f, i) => ({ label: `${f.name} (Friend)`, key: `known_friend_${i}`, isKnown: true }))),
          ]
          return (
            <>
              <button onClick={() => { setAssaultStep(null); setAssaultVictim(null) }} className="text-bit-blue text-sm font-semibold mb-2">← Back</button>
              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">People you know</p>
              {knownTargets.map(v => (
                <Btn key={v.key} danger onClick={() => {
                  setAssaultVictim(v)
                  setAssaultStep(null)
                  onClose()
                  triggerMinigame({
                    ...assaultCrime.minigame,
                    title: `${assaultCrime.name} — ${v.label}`,
                    description: `You go after ${v.label.split(' (')[0]}.`,
                    onSuccess: {
                      outcome: `You get the better of ${v.label.split(' (')[0]}.`,
                      effect: (s) => ({
                        ...s,
                        karma: Math.max(0, (s.karma ?? 50) - 15),
                        actionsThisYear: (s.actionsThisYear ?? 0) + 1,
                        flags: [...new Set([...s.flags, 'violent'])],
                        log: [...(s.log ?? []), { age: s.age, text: `You assault ${v.label.split(' (')[0]}.`, isKey: true }],
                      }),
                    },
                    onFailure: {
                      outcome: `Caught. Arrested for ${assaultCrime.name}.`,
                      effect: (s) => {
                        const sent = calcSentence(assaultCrime)
                        return { ...s, inPrison: sent > 0, prisonSentence: sent, actionsThisYear: (s.actionsThisYear ?? 0) + 1,
                          criminalRecord: [...(s.criminalRecord ?? []), { crime: assaultCrime.criminalRecordEntry, age: s.age, category: 'violent' }],
                          log: [...(s.log ?? []), { age: s.age, text: `Arrested for ${assaultCrime.name}. Sentenced to ${sent} year${sent !== 1 ? 's' : ''}.`, isKey: true }] }
                      },
                    },
                  })
                }} title={v.label} subtitle="Known target" />
              ))}
              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-3 py-1">Strangers</p>
              {STRANGER_VICTIMS.map(v => (
                <Btn key={v.key} danger onClick={() => {
                  setAssaultStep(null)
                  onClose()
                  const baseRisk = assaultCrime?.arrestRisk ?? 0.40
                  const adjustedRisk = Math.max(0.05, Math.min(0.95, baseRisk + v.arrestMod))
                  triggerMinigame({
                    type: 'fight', difficulty: assaultCrimeId === 'aggravated_assault' ? 'hard' : 'normal',
                    title: `${assaultCrime?.name} — ${v.label}`,
                    description: `You go after ${v.label.toLowerCase()}. ${v.desc}`,
                    onSuccess: {
                      outcome: `You get the better of ${v.label.toLowerCase()}.`,
                      effect: (s) => ({
                        ...s,
                        karma: Math.max(0, (s.karma ?? 50) - 12),
                        actionsThisYear: (s.actionsThisYear ?? 0) + 1,
                        flags: [...new Set([...s.flags, 'violent'])],
                        log: [...(s.log ?? []), { age: s.age, text: `You assault ${v.label.toLowerCase()}.`, isKey: true }],
                      }),
                    },
                    onFailure: {
                      outcome: Math.random() < adjustedRisk ? `Caught. Arrested for ${assaultCrime?.name}.` : `You come off worse. Bruised and bleeding.`,
                      effect: (s) => {
                        if (Math.random() < adjustedRisk) {
                          const sent = calcSentence(assaultCrime)
                          return { ...s, inPrison: sent > 0, prisonSentence: sent, actionsThisYear: (s.actionsThisYear ?? 0) + 1,
                            criminalRecord: [...(s.criminalRecord ?? []), { crime: assaultCrime?.criminalRecordEntry ?? 'Assault', age: s.age, category: 'violent' }],
                            log: [...(s.log ?? []), { age: s.age, text: `Arrested for ${assaultCrime?.name}. Sentenced to ${calcSentence(assaultCrime)} year(s).`, isKey: true }] }
                        }
                        return { ...s, stats: { ...s.stats, health: Math.max(0, s.stats.health - 15) }, actionsThisYear: (s.actionsThisYear ?? 0) + 1, log: [...(s.log ?? []), { age: s.age, text: `You get beaten by ${v.label.toLowerCase()}.`, isKey: false }] }
                      },
                    },
                  })
                }} title={`${v.emoji} ${v.label}`} subtitle={v.desc} cost={`Arrest risk: ${Math.round(Math.max(0.05, (assaultCrime?.arrestRisk ?? 0.4) + v.arrestMod) * 100)}%`} />
              ))}
            </>
          )
        }

        // Murder victim selection flow
        if (murderStep === 'victim') {
          const knownVictims = [
            ...(state.partner ? [{ label: `${state.partner.name} (Partner)`, key: 'partner' }] : []),
            ...(state.parents?.mother?.alive ? [{ label: `${state.parents.mother.name} (Mother)`, key: 'mother' }] : []),
            ...(state.parents?.father?.alive ? [{ label: `${state.parents.father.name} (Father)`, key: 'father' }] : []),
            ...((state.siblings ?? []).filter(s => s.alive).map((s, i) => ({ label: `${s.name} (Sibling)`, key: `sibling_${i}`, idx: i }))),
            ...((state.children ?? []).filter(c => c.alive !== false).map((c, i) => ({ label: `${c.name.split(' ')[0]} (Child)`, key: `child_${i}`, idx: i }))),
            ...((state.friends ?? []).filter(f => f.alive).map((f, i) => ({ label: `${f.name} (Friend)`, key: `friend_${i}`, idx: i }))),
            ...((state.exPartners ?? []).filter(e => e.alive !== false).map((e, i) => ({ label: `${e.name} (Ex)`, key: `ex_${i}`, idx: i }))),
          ]
          const strangerVictimsForMurder = STRANGER_VICTIMS.map(v => ({
            label: `${v.label} (Stranger)`, key: v.key, isStranger: true, detectionMod: v.detectionMod, emoji: v.emoji, desc: v.desc,
          }))
          return (
            <>
              <button onClick={() => setMurderStep(null)} className="text-bit-blue text-sm font-semibold mb-2">← Back</button>
              {knownVictims.length > 0 && (
                <>
                  <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1 mb-1">People you know</p>
                  {knownVictims.map(v => (
                    <Btn key={v.key} danger onClick={() => { setMurderVictim(v); setMurderStep('method') }} title={v.label} subtitle="Select as target" />
                  ))}
                </>
              )}
              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-3 py-1 mb-1">Strangers</p>
              {strangerVictimsForMurder.map(v => (
                <Btn key={v.key} danger onClick={() => { setMurderVictim(v); setMurderStep('method') }}
                  title={`${v.emoji} ${v.label}`}
                  subtitle={v.desc}
                />
              ))}
            </>
          )
        }

        if (murderStep === 'method' && murderVictim) {
          const murderCrime = CRIMES.find(c => c.id === 'murder')
          const victimFirstName = murderVictim.label.split(' (')[0]
          const isStranger = !!murderVictim.isStranger
          // Stranger victims adjust detection probability
          const strangerDetMod = isStranger ? (murderVictim.detectionMod ?? 0) : 0
          return (
            <>
              <button onClick={() => setMurderStep('victim')} className="text-bit-blue text-sm font-semibold mb-2">← Back</button>
              <div className="bg-red-50 rounded-xl border border-red-200 p-3 mb-2">
                <p className="text-red-700 text-xs font-semibold">Target: {murderVictim.label}</p>
                <p className="text-red-500 text-xs mt-0.5">You're really feeling like you shouldn't be doing this.</p>
              </div>
              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1 mb-1">Pick your method</p>
              {MURDER_METHODS.map(({ name: method, detection }) => {
                const adjDetection = Math.max(0.01, Math.min(0.97, detection + strangerDetMod))
                return (
                <Btn key={method} danger
                  onClick={() => {
                    const failSentence = calcSentence(murderCrime)
                    const capturedV = murderVictim
                    onClose()
                    setMurderStep(null)
                    setMurderVictim(null)
                    triggerMinigame({
                      type: 'fight', difficulty: 'hard',
                      title: `Murder · ${method}`,
                      description: `You attempt to kill ${victimFirstName.toLowerCase()} using ${method.toLowerCase()}.`,
                      onSuccess: {
                        outcome: `You kill ${victimFirstName.toLowerCase()}. The deed is done.`,
                        effect: (s) => {
                          let next = { ...s }
                          next.karma = Math.max(0, (next.karma ?? 50) - 30)
                          next.flags = [...new Set([...next.flags, 'killer'])]
                          if (!capturedV.isStranger) killVictim(next, capturedV)
                          next.actionsThisYear = (next.actionsThisYear ?? 0) + 1
                          next.log = [...(next.log ?? []), { age: s.age, text: `You killed ${capturedV.label.split(' (')[0].toLowerCase()} using ${method.toLowerCase()}.`, isKey: true }]
                          // Post-murder investigation window — decays each year
                          next.mem = { ...next.mem, murder_pending_detection: { risk: adjDetection } }
                          if (adjDetection <= 0.10) {
                            next.log = [...next.log, { age: s.age, text: 'The death is ruled an accident. For now, you are not a suspect.', isKey: false }]
                          } else {
                            next.log = [...next.log, { age: s.age, text: 'Police are treating the death as suspicious. An investigation has opened.', isKey: false }]
                          }
                          return next
                        },
                      },
                      onFailure: {
                        outcome: `Your attempt fails. Arrested for attempted murder.`,
                        effect: (s) => ({
                          ...s,
                          inPrison: failSentence > 0,
                          prisonSentence: failSentence,
                          actionsThisYear: (s.actionsThisYear ?? 0) + 1,
                          karma: Math.max(0, (s.karma ?? 50) - 20),
                          criminalRecord: [...(s.criminalRecord ?? []), { crime: 'Attempted murder', age: s.age, category: 'violent' }],
                          log: [...(s.log ?? []), { age: s.age, text: `Arrested for attempted murder. Sentenced to ${failSentence} years.`, isKey: true }],
                        }),
                      },
                    })
                  }}
                  title={method}
                  subtitle={`Detection risk if successful: ${Math.round(adjDetection * 100)}%`}
                />
                )
              })}
            </>
          )
        }

        const crimeRefs = ACTIVITIES.crime ?? []
        return crimeRefs
          .filter(ref => !ref.minAge || state.age >= ref.minAge)
          .map(ref => {
            const crime = CRIMES.find(c => c.id === ref.crimeId)
            if (!crime) return null
            if (crime.requiresFlag && !state.flags.includes(crime.requiresFlag)) return null
            const canAfford = !crime.wealthRequirement || state.character?.wealthTier >= crime.wealthRequirement
            if (crime.id === 'murder') {
              return (
                <Btn key="murder" disabled={noActions} danger
                  onClick={() => setMurderStep('victim')}
                  title="🔪 Murder"
                  subtitle="Choose your target and method. Getting away with it is not guaranteed."
                  cost="Varies by method"
                />
              )
            }
            if (crime.id === 'assault' || crime.id === 'aggravated_assault') {
              return (
                <Btn key={crime.id} disabled={noActions} danger
                  onClick={() => { setAssaultCrimeId(crime.id); setAssaultStep('victim') }}
                  title={`🥊 ${crime.name}`}
                  subtitle={crime.description}
                  cost={`Arrest risk: ${Math.round(crime.arrestRisk * 100)}%`}
                />
              )
            }
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
                      next.karma = Math.max(0, (next.karma ?? 50) + (crime.minigame.karmaHit ?? -8))
                      next.flags = [...new Set([...next.flags, ...(crime.addFlag ? [crime.addFlag] : [])])]
                      next.actionsThisYear = (next.actionsThisYear ?? 0) + 1
                      next.log = [...(next.log ?? []), { age: s.age, text: `You committed ${crime.name}.`, isKey: false }]
                      return next
                    },
                  },
                  onFailure: {
                    outcome: crime.minigame.failOutcome ?? 'You are caught.',
                    effect: (s) => {
                      const sentence = calcSentence(crime)
                      return {
                        ...s,
                        inPrison: sentence > 0,
                        prisonSentence: sentence,
                        actionsThisYear: (s.actionsThisYear ?? 0) + 1,
                        criminalRecord: [...(s.criminalRecord ?? []), { crime: crime.criminalRecordEntry ?? crime.name, age: s.age, category: crime.category ?? 'other' }],
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
        const isUndocumented = state.residencyStatus === 'undocumented' || state.residencyStatus === 'tourist_overstay'
        const isFugitive = (state.wanted || state.flags.includes('escaped_prisoner')) && !state.flags.includes('assumed_identity')
        const hasAssumedId = state.flags.includes('assumed_identity')
        const isBlockedFromFormal = isUndocumented || isFugitive

        // Careers locked by education alone (all other requirements pass)
        const eduOrder = ['none', 'primary', 'secondary', 'university', 'graduate']
        const eduLabels = { primary: 'primary school', secondary: 'secondary education', university: 'a university degree', graduate: 'a graduate degree' }
        const playerEduIdx = eduOrder.indexOf(state.education?.level ?? 'none')
        const availableIds = new Set(available.map(c => c.id))
        const gdpOrder = ['very_low', 'low', 'low_medium', 'medium', 'medium_high', 'high', 'very_high']
        const lockedByEdu = CAREERS.filter(career => {
          if (availableIds.has(career.id)) return false
          if (career.id === state.career?.id) return false
          if (career.partTime) return false
          if (career.requirements.minAge && state.age < career.requirements.minAge) return false
          if (career.requirements.maxAge && state.age > career.requirements.maxAge) return false
          if (career.minYear && state.currentYear < career.minYear) return false
          if (career.maxYear && state.currentYear > career.maxYear) return false
          if (career.requirements.minSmarts && state.stats.smarts < career.requirements.minSmarts) return false
          if (career.gdpRequired && career.gdpRequired !== 'any' && gdpOrder.indexOf(state.character.country.gdp) < gdpOrder.indexOf(career.gdpRequired)) return false
          if (Array.isArray(career.archetypeAvailable) && !career.archetypeAvailable.includes(state.character.country.archetype)) return false
          if (career.requirements.flags && !career.requirements.flags.some(f => state.flags.includes(f))) return false
          // Only include if the blocker is education level
          const reqEduIdx = eduOrder.indexOf(career.requirements.education)
          return reqEduIdx > 0 && playerEduIdx < reqEduIdx
        }).slice(0, 4)

        return (
          <>
            {isHomeless && (
              <div className="px-3 py-3 rounded-xl border border-amber-200 bg-amber-50 mb-1">
                <p className="text-amber-700 text-sm font-semibold">Job applications are harder without a fixed address</p>
                <p className="text-amber-600 text-xs mt-0.5">Most employers require a permanent address. You can still apply, but expect fewer responses. Sorting your housing situation will improve your chances.</p>
              </div>
            )}
            {isUndocumented && !isFugitive && (
              <div className="px-3 py-3 rounded-xl border border-amber-200 bg-amber-50 mb-1">
                <p className="text-amber-700 text-sm font-semibold">No formal employment available</p>
                <p className="text-amber-600 text-xs mt-0.5">Without legal status, you cannot take a salaried position. Cash work comes through life events.</p>
              </div>
            )}
            {isFugitive && (
              <div className="px-3 py-3 rounded-xl border border-red-200 bg-red-50 mb-1">
                <p className="text-red-700 text-sm font-semibold">🚨 Formal work is not an option</p>
                <p className="text-red-600 text-xs mt-0.5">Any employer will run a background check. You need cash work or a false identity first.</p>
              </div>
            )}
            {hasAssumedId && (state.wanted || state.flags.includes('escaped_prisoner')) && (
              <div className="px-3 py-3 rounded-xl border border-yellow-200 bg-yellow-50 mb-1">
                <p className="text-yellow-700 text-sm font-semibold">⚠️ Operating under a false identity</p>
                <p className="text-yellow-600 text-xs mt-0.5">Formal careers are available, but any background check may expose you.</p>
              </div>
            )}
            {state.career && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Current: {state.career.title}</p>
                {anySevereUnmanaged && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-1 text-xs text-amber-800">
                    ⚠️ A severe unmanaged condition is affecting your capacity. Working harder carries additional health risk.
                  </div>
                )}
                <Btn onClick={() => go(workHarder)} title="Work Harder" subtitle={anySevereUnmanaged ? "Extra effort — with your condition, this costs more health." : "Extra effort. Costs health and happiness."} />
                <Btn onClick={() => go(schmoozeBoss)} title="Schmooze the Boss" subtitle="Charisma-based. Results vary." />
                <Btn onClick={() => go(askForRaise)} title="Ask for a Raise" subtitle="Performance and charisma determine success." />
                <Btn onClick={() => go(quitJob)} title="Quit Your Job" subtitle={`Leave your position as ${state.career.title}.`} danger />
              </>
            )}
            {state.age >= 55 && !state.retired && (
              <Btn onClick={() => go(retire)} title="Retire" subtitle="End your working life on your own terms." />
            )}
            {!isBlockedFromFormal && available.length > 0 && (
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
            {!isBlockedFromFormal && available.length === 0 && !state.career && (
              <p className="text-natalis-muted text-sm italic p-3">No careers available for your current qualifications.</p>
            )}
            {!isBlockedFromFormal && lockedByEdu.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-3">Requires more education</p>
                {lockedByEdu.map(career => (
                  <div key={career.id} className="rounded-xl border border-natalis-border bg-gray-50 px-4 py-3 opacity-60">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-natalis-text truncate">{career.levels[0].title}</p>
                        <p className="text-xs text-natalis-muted mt-0.5">{career.description}</p>
                      </div>
                      <span className="text-[10px] font-semibold text-stone-400 bg-stone-100 rounded-full px-2 py-0.5 whitespace-nowrap flex-shrink-0">
                        Needs {eduLabels[career.requirements.education] ?? career.requirements.education}
                      </span>
                    </div>
                  </div>
                ))}
              </>
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
        const substanceConditionWarning = hasCondition('heart_disease') || hasCondition('depression_chronic') || hasCondition('copd') || hasCondition('diabetes_type1') || hasCondition('diabetes_type2')
        return (
          <>
            {isAddict && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-1">
                <span className="text-lg">⚠️</span>
                <p className="text-xs font-semibold text-bit-red">Active addiction. Consider rehab.</p>
              </div>
            )}
            {substanceConditionWarning && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-1 text-xs text-amber-800">
                {hasCondition('heart_disease') && <p>Heart disease: alcohol increases cardiovascular risk.</p>}
                {hasCondition('depression_chronic') && <p>Depression: substances typically make this worse over time.</p>}
                {hasCondition('copd') && <p>COPD: smoking or inhaled substances damage airways further.</p>}
                {(hasCondition('diabetes_type1') || hasCondition('diabetes_type2')) && <p>Diabetes: alcohol affects blood sugar unpredictably.</p>}
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

      case 'travel': {
        if (state.age < 16) return <p className="text-natalis-muted text-sm italic p-3">You're too young to travel alone.</p>

        // Scale costs for display
        const gdpCostMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
        const costMult = gdpCostMult[state.character?.country?.gdp] ?? 1.0
        const visited = (state.travels ?? []).map(t => t.id)

        const regions = [
          { key: 'domestic',      label: '🗺️ Domestic' },
          { key: 'regional',      label: '🌍 Regional' },
          { key: 'international', label: '✈️ International' },
          { key: 'luxury',        label: '💎 Luxury' },
        ]

        return (
          <>
            {(state.travels ?? []).length > 0 && (
              <div className="bg-blue-50 rounded-xl border border-blue-200 px-4 py-2 mb-2">
                <p className="text-blue-700 text-xs font-semibold">{(state.travels ?? []).length} trip{(state.travels ?? []).length !== 1 ? 's' : ''} taken · {[...new Set((state.travels ?? []).map(t => t.name))].slice(-3).join(', ')}</p>
              </div>
            )}
            {regions.map(region => {
              const dests = DESTINATIONS.filter(d => d.region === region.key && d.minAge <= state.age && (!d.minYear || state.currentYear >= d.minYear))
              if (dests.length === 0) return null
              return (
                <div key={region.key}>
                  <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1 py-1">{region.label}</p>
                  {dests.map(dest => {
                    const scaledCost = Math.round(dest.cost * costMult)
                    const canAfford = (state.money ?? 0) >= scaledCost
                    const timesVisited = visited.filter(id => id === dest.id).length
                    return (
                      <Btn
                        key={dest.id}
                        disabled={noActions || !canAfford}
                        onClick={() => { bookTrip(dest.id); onClose() }}
                        title={`${dest.name}${timesVisited > 0 ? ` (×${timesVisited})` : ''}`}
                        subtitle={dest.type.charAt(0).toUpperCase() + dest.type.slice(1)}
                        cost={canAfford ? `$${scaledCost.toLocaleString()}` : `Need $${scaledCost.toLocaleString()}`}
                      />
                    )
                  })}
                </div>
              )
            })}

            {/* Emigrate section */}
            {state.age >= 18 && (
              <>
                <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1 pt-3 pb-1">🛫 Emigrate</p>
                {state.flags.includes('emigrated') && state.currentCountry && (
                  <div className="bg-blue-50 rounded-xl border border-blue-200 px-4 py-2 mb-2">
                    <p className="text-blue-700 text-xs font-semibold">Currently living in {state.currentCountry.name}</p>
                  </div>
                )}
                {COUNTRIES.filter(c => c.name !== (state.currentCountry ?? state.character?.country)?.name)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(c => (
                    <Btn
                      key={c.name}
                      disabled={noActions}
                      onClick={() => { doEmigrate(c.name); onClose() }}
                      title={`Move to ${c.name}`}
                      subtitle={`${c.archetype.replace(/_/g, ' ')} · Est. $3,000–$15,000 moving costs`}
                    />
                  ))
                }
              </>
            )}
          </>
        )
      }

      case 'business': {
        if (state.age < 18) return <p className="text-natalis-muted text-sm italic p-3">You must be 18+ to start a business.</p>
        const biz = state.business
        if (biz?.active) {
          const perf = biz.performance ?? 50
          const perfColor = perf > 65 ? '#34c759' : perf > 35 ? '#ff9500' : '#ff3b30'
          return (
            <>
              <div className="bg-white rounded-xl border border-natalis-border p-4 space-y-2 mb-2">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-natalis-text">{biz.emoji} {biz.name}</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">Year {biz.yearsOpen}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-natalis-muted">
                    <span>Performance</span><span style={{ color: perfColor }}>{Math.round(perf)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${perf}%`, backgroundColor: perfColor }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-natalis-muted">
                  <span>👥 Staff: {biz.employees ?? 0}</span>
                  <span>📈 Value: ${(biz.value ?? 0).toLocaleString()}</span>
                </div>
              </div>
              <Btn disabled={noActions} onClick={() => go(manageBusiness)} title="Manage Business" subtitle="Put in extra hours to improve performance." />
              <Btn disabled={noActions} onClick={() => go(hireEmployee)} title="Hire Employee" subtitle="Add staff to boost performance." cost="~$2,000" />
              <Btn onClick={() => { closeBusiness(); onClose() }} title="Close Business" subtitle="Wind down and take salvage value." danger />
            </>
          )
        }
        const available = getAvailableBusinessTypes(state)
        const bizCostMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
        const bizMult = bizCostMult[state.character?.country?.gdp] ?? 1.0
        return (
          <>
            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Start a Business</p>
            {available.map(bt => (
              <Btn key={bt.id}
                disabled={noActions || (state.money ?? 0) < Math.round(bt.startupCost * bizMult)}
                onClick={() => { startBusiness(bt.id); onClose() }}
                title={`${bt.emoji} ${bt.name}`}
                subtitle={bt.description}
                cost={`Startup: $${Math.round(bt.startupCost * bizMult).toLocaleString()}`}
              />
            ))}
            {available.length === 0 && <p className="text-natalis-muted text-sm italic p-3">No business types available yet.</p>}
          </>
        )
      }

      case 'immigration': {
        const rs = state.residencyStatus ?? 'citizen'
        const isAbroad = state.flags.includes('emigrated') && state.currentCountry?.name !== state.character?.country?.name
        const yearsAbroad = state.yearsAbroad ?? 0

        const LADDER = {
          work_visa:          { next: 'Permanent Residency', yearsReq: 5,  fee: 3000  },
          permanent_resident: { next: 'Citizenship',         yearsReq: 10, fee: 1500  },
          refugee_status:     { next: 'Permanent Residency', yearsReq: 3,  fee: 500   },
          asylum_seeker:      { next: 'Refugee Status',      yearsReq: 1,  fee: 0     },
          undocumented:       { next: 'Work Visa',           yearsReq: 0,  fee: 2000  },
          tourist_overstay:   { next: 'Work Visa',           yearsReq: 0,  fee: 2000  },
        }
        const path = LADDER[rs]
        const RS_LABELS = {
          citizen: 'Citizen', permanent_resident: 'Permanent Resident', work_visa: 'Work Visa',
          undocumented: 'Undocumented', refugee_status: 'Refugee Status', asylum_seeker: 'Asylum Seeker',
          tourist_overstay: 'Overstayed Visa',
        }
        const RS_COLORS = {
          citizen: '#34c759', permanent_resident: '#34c759', work_visa: '#ff9500',
          undocumented: '#ff3b30', refugee_status: '#ff9500', asylum_seeker: '#ff9500',
          tourist_overstay: '#ff3b30',
        }

        return (
          <>
            <div className="bg-white rounded-xl border border-natalis-border p-4 mb-2 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-natalis-muted font-semibold uppercase tracking-wider">Current Status</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: RS_COLORS[rs] ?? '#8e8e93', backgroundColor: `${RS_COLORS[rs]}18` ?? '#8e8e9318' }}>
                  {RS_LABELS[rs] ?? rs}
                </span>
              </div>
              {isAbroad && <p className="text-xs text-natalis-muted">Living in {state.currentCountry?.name} · {yearsAbroad} year{yearsAbroad !== 1 ? 's' : ''} abroad</p>}
              {rs === 'citizen' && <p className="text-xs text-natalis-muted">You are a citizen. No immigration actions required.</p>}
            </div>

            {rs !== 'citizen' && !isAbroad && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-2">
                <p className="text-xs text-amber-800">Immigration actions require living abroad. Use Travel to emigrate first.</p>
              </div>
            )}

            {path && isAbroad && (
              <>
                <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1 py-1">Upgrade Status</p>
                <Btn
                  disabled={noActions || yearsAbroad < path.yearsReq || (state.money ?? 0) < path.fee}
                  onClick={() => { doUpgradeResidency(); onClose() }}
                  title={`Apply for ${path.next}`}
                  subtitle={
                    yearsAbroad < path.yearsReq
                      ? `Requires ${path.yearsReq - yearsAbroad} more year${path.yearsReq - yearsAbroad !== 1 ? 's' : ''} of residency`
                      : path.fee > 0 ? `Application fee: $${path.fee.toLocaleString()}` : 'No fee'
                  }
                  cost={path.fee > 0 ? `$${path.fee.toLocaleString()}` : 'Free'}
                />
              </>
            )}

            {isAbroad && !['citizen', 'permanent_resident', 'refugee_status', 'asylum_seeker'].includes(rs) && (
              <>
                <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1 pt-2">Asylum</p>
                <Btn
                  disabled={noActions}
                  onClick={() => { doSeekAsylum(); onClose() }}
                  title="Seek Asylum"
                  subtitle="Claim protection based on persecution or conflict. Success varies with your history."
                />
              </>
            )}

            {rs === 'asylum_seeker' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mt-1">
                <p className="text-xs text-blue-800">Your asylum application is pending. After 1 year you may apply to convert it to Refugee Status.</p>
              </div>
            )}
          </>
        )
      }

      case 'underground': {
        const isWanted = state.wanted || state.flags.includes('escaped_prisoner')
        const inJail = state.inPrison
        if (!isWanted && !inJail) {
          return <p className="text-natalis-muted text-sm italic p-3">Nothing to do here unless you're in trouble with the law.</p>
        }

        // Prison escape option
        if (inJail) {
          return (
            <>
              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Escape from Prison</p>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 mb-2 text-xs text-natalis-muted">
                Sentence remaining: {state.prisonSentence} year{state.prisonSentence !== 1 ? 's' : ''}. Escaping makes you a wanted fugitive.
              </div>
              <Btn danger disabled={noActions}
                onClick={() => {
                  onClose()
                  triggerMinigame({
                    type: 'maze', difficulty: state.prisonSentence > 10 ? 'hard' : 'normal',
                    title: 'Prison Break',
                    description: 'Navigate through the facility before the alarm sounds.',
                    skipable: true,
                    onSuccess: {
                      outcome: 'You slip through the gaps and escape. Now you\'re on the run.',
                      effect: (s) => ({
                        ...s,
                        inPrison: false,
                        wanted: true,
                        wantedFor: s.wantedFor ?? 'escaped_conviction',
                        flags: [...new Set([...s.flags, 'escaped_prisoner'])],
                        log: [...s.log, { age: s.age, text: 'You escape from prison. You are now a fugitive.', isKey: true }],
                      }),
                    },
                    onFailure: {
                      outcome: 'Caught during the escape attempt. Extra years added.',
                      effect: (s) => ({
                        ...s,
                        prisonSentence: (s.prisonSentence ?? 0) + 3,
                        stats: { ...s.stats, happiness: Math.max(0, s.stats.happiness - 15) },
                        log: [...s.log, { age: s.age, text: 'Your escape attempt fails. Three years added to your sentence.', isKey: true }],
                      }),
                    },
                  })
                }}
                title="🏃 Attempt Prison Break"
                subtitle="High risk. Failure adds 3 years. Success leaves you a fugitive."
              />
            </>
          )
        }

        // On the run options
        const gdpIllegalMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
        const illMult = gdpIllegalMult[state.character?.country?.gdp] ?? 1.0
        const identityCost = Math.round(8000 * illMult)
        const smugglerMin = Math.round(8000 * illMult)
        const smugglerMax = Math.round(20000 * illMult)

        return (
          <>
            <div className="bg-red-50 rounded-xl border border-red-200 p-3 mb-2">
              <p className="text-red-700 text-xs font-semibold">🚨 You are a wanted fugitive</p>
              <p className="text-red-500 text-xs mt-0.5">Police search intensifies each year. Reduce your capture risk.</p>
            </div>

            {!state.flags.includes('assumed_identity') && (
              <Btn disabled={noActions || (state.money ?? 0) < identityCost}
                onClick={() => { assumeIdentity(); onClose() }}
                title="🪪 Assume a False Identity"
                subtitle={`Buy forged documents. Reduces annual capture risk by 8%.`}
                cost={`$${identityCost.toLocaleString()}`}
              />
            )}

            {state.flags.includes('assumed_identity') && (
              <div className="bg-green-50 rounded-xl border border-green-200 px-3 py-2 text-xs text-green-700 font-semibold">
                ✓ Living as: {state.assumedIdentity?.name ?? 'Unknown'}
              </div>
            )}

            {!state.flags.includes('appearance_changed') && (
              <Btn disabled={noActions}
                onClick={() => { setActiveTop('plastic_surg') }}
                title="✂️ Change Your Appearance"
                subtitle="Cosmetic surgery, hair, style change. Reduces capture risk by 5%."
              />
            )}

            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2 pb-1">Flee the Country Illegally</p>
            <p className="text-natalis-muted text-xs px-1 mb-2">Smuggler fee: ${smugglerMin.toLocaleString()}–${smugglerMax.toLocaleString()}. 30% chance of interception.</p>
            {COUNTRIES.slice(0, 12).filter(c => c.name !== state.character?.country?.name).map(c => (
              <Btn key={c.name} danger
                disabled={noActions || (state.money ?? 0) < smugglerMin}
                onClick={() => { goIllegal(c.name); onClose() }}
                title={`→ ${c.name}`}
                subtitle={`${c.archetype?.replace(/_/g, ' ')} · Flee illegally`}
              />
            ))}
          </>
        )
      }

      case 'prison': {
        if (!state.inPrison) return <p className="text-natalis-muted text-sm italic p-3">You are not in prison.</p>
        const bribeMin = 500
        return (
          <>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 mb-3">
              <p className="text-white text-xs font-semibold">🔒 Incarcerated</p>
              <p className="text-gray-300 text-xs mt-0.5">Sentence remaining: <span className="text-white font-bold">{state.prisonSentence} year{state.prisonSentence !== 1 ? 's' : ''}</span></p>
            </div>

            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Daily Life</p>

            <Btn disabled={noActions}
              onClick={() => { doPrisonWork(); onClose() }}
              title="🧹 Prison Work Detail"
              subtitle="Laundry, kitchen, yard crew. Earns a little cash."
            />

            <Btn disabled={noActions}
              onClick={() => { doPrisonCry(); onClose() }}
              title="😢 Have a Cry"
              subtitle="Let it out. Surprisingly therapeutic."
            />

            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-3 py-1">High-Risk Actions</p>

            <Btn disabled={noActions || (state.money ?? 0) < bribeMin} danger
              onClick={() => { doPrisonBribeGuard(); onClose() }}
              title="💵 Bribe a Guard"
              subtitle={`50% chance to cut sentence. 25% chance it backfires. Costs $500–$3,000.`}
            />

            <Btn disabled={noActions} danger
              onClick={() => { doPrisonStartRiot(); onClose() }}
              title="🔥 Start a Riot"
              subtitle="40% success. Could reduce sentence — or add years and get you hurt."
            />

            {state.partner && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-3 py-1">Relationships</p>
                <Btn disabled={noActions}
                  onClick={() => { doPrisonConjugalVisit(); onClose() }}
                  title={`💑 Conjugal Visit — ${state.partner.name}`}
                  subtitle="Requires a strong relationship. 10% chance they don't show."
                />
              </>
            )}

            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-3 py-1">Escape</p>
            <div className="bg-red-50 rounded-xl border border-red-200 p-3 mb-2 text-xs text-red-700">
              Sentence remaining: <strong>{state.prisonSentence} year{state.prisonSentence !== 1 ? 's' : ''}</strong>. Escaping makes you a wanted fugitive.
            </div>
            <Btn danger disabled={noActions}
              onClick={() => {
                onClose()
                triggerMinigame({
                  type: 'maze', difficulty: state.prisonSentence > 10 ? 'hard' : 'normal',
                  title: 'Prison Break',
                  description: 'Navigate through the facility before the alarm sounds.',
                  skipable: true,
                  onSuccess: {
                    outcome: 'You slip through the gaps and escape. Now you\'re on the run.',
                    effect: (s) => ({
                      ...s,
                      inPrison: false,
                      wanted: true,
                      wantedFor: s.wantedFor ?? 'escaped_conviction',
                      flags: [...new Set([...s.flags, 'escaped_prisoner'])],
                      log: [...s.log, { age: s.age, text: 'You escape from prison. You are now a fugitive.', isKey: true }],
                    }),
                  },
                  onFailure: {
                    outcome: 'Caught during the escape attempt. Three years added.',
                    effect: (s) => ({
                      ...s,
                      prisonSentence: (s.prisonSentence ?? 0) + 3,
                      stats: { ...s.stats, happiness: Math.max(0, s.stats.happiness - 15) },
                      log: [...s.log, { age: s.age, text: 'Your escape attempt fails. Three years added to your sentence.', isKey: true }],
                    }),
                  },
                })
              }}
              title="🏃 Attempt Prison Break"
              subtitle="Maze minigame. Failure adds 3 years. Success: you're a fugitive."
            />
          </>
        )
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
              if (cat.key === 'mind_body' && state.age < 6) return null
              if (cat.key === 'hobbies' && state.age < 5) return null
              if (cat.key === 'education' && state.age < 8) return null
              if (cat.key === 'movies' && state.age < 5) return null
              if (cat.key === 'salon' && state.age < 12) return null
              if (cat.key === 'friends' && state.age < 5) return null
              if (cat.key === 'nightlife' && state.age < 18) return null
              if (cat.key === 'fertility' && state.age < 14) return null
              if (cat.key === 'plastic_surg' && state.age < 18) return null
              if (cat.key === 'licenses' && state.age < 16) return null
              if (cat.key === 'race_tracks' && state.age < 18) return null
              if (cat.key === 'pets' && state.age < 8) return null
              if (cat.key === 'shopping' && state.age < 8) return null
              if (cat.key === 'social_media' && state.age < 13) return null
              if (cat.key === 'career' && state.age < 14) return null
              if (cat.key === 'love' && state.age < 13) return null
              if (cat.key === 'assets' && state.age < 18) return null
              if (cat.key === 'money' && state.age < 14) return null
              if (cat.key === 'rehab' && !hasAddiction && !(ACTIVITIES.body ?? []).some(a => (a.id === 'quit_smoking' || a.id === 'rehabilitation') && (!a.condition || a.condition(G)))) return null
              if (cat.key === 'substances' && state.age < 14) return null
              if (cat.key === 'crime' && state.age < 12) return null
              if (cat.key === 'travel' && state.age < 16) return null
              if (cat.key === 'business' && state.age < 18) return null
              if (cat.key === 'immigration' && state.residencyStatus === 'citizen' && !state.flags.includes('emigrated')) return null
              if (cat.key === 'underground' && !state.inPrison && !state.wanted && !state.flags.includes('escaped_prisoner')) return null
              if (cat.key === 'prison' && !state.inPrison) return null
              // When in prison, hide most outside-world activities
              const prisonBlockedCats = ['love', 'fertility', 'nightlife', 'movies', 'salon', 'shopping', 'social_media', 'plastic_surg', 'race_tracks', 'rehab', 'licenses', 'assets', 'crime', 'travel', 'business', 'career', 'underground', 'immigration']
              if (state.inPrison && prisonBlockedCats.includes(cat.key)) return null

              const isUnderground = state.inPrison || state.wanted || state.flags.includes('escaped_prisoner')
              const badge = cat.key === 'prison' && state.inPrison ? { text: `${state.prisonSentence}yr`, color: '#ff3b30' } :
                            cat.key === 'underground' && isUnderground ? { text: '!', color: '#ff3b30' } :
                            cat.key === 'rehab' && hasAddiction ? { text: '!', color: '#ff3b30' } :
                            cat.key === 'mind_body' && anySevereUnmanaged ? { text: '⚕', color: '#ff9500' } :
                            cat.key === 'love' && pendingPartner && !state.partner ? { text: '💘', color: '#ff6b81' } :
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

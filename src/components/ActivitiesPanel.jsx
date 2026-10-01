import { useState, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { ACTIVITIES } from '../data/activities'
import { CRIMES, VIOLENT_TARGETS, HOMICIDE_METHODS, crimeBarred, crimeArrestRisk } from '../data/crimes'
import { getAvailableCareers, buildPendingTrial, livingPartner } from '../engine/gameEngine'
import { CAREERS } from '../data/careers'
import { hasTech } from '../data/technology.js'
import { startingSalaryRange } from '../engine/tick'
import {
  estimateCost, eraMoney, hiringCostOf, getAvailableBusinessTypes,
  activityOffered, placeNow, salonOptions, shoppingOptions, surgeryOptions, martialOptions,
  petOptions, licenceOptions, propertyOptions, vehicleOptions, tripOptions, emigrationOptions,
  goingOutAvailable, cinemaAvailable, datingAppAvailable, datingAppLabel, racecourseOpen, raceCard,
  raceStakes, rehabExists, adoptionExists, adoptionPrice, paydayOffer, benefitsOffer, bankruptcyOpen,
  divorceLegal, crimeHaul, substanceOptions,
} from '../engine/playerActions'
import { destinationsFor } from '../data/exitRules.js'
import { forgedPapersCost, smugglerFee } from '../store/gameStore'

// The labels were a BitLife menu — "Salon & Spa", "Plastic Surgery", "Race
// Tracks: Bet on the races", "Nightlife: Go out and party". They are plainer
// now, and every category below is shown only where something in it exists for
// this person (see isCategoryVisible).
const TOP_CATEGORIES = [
  { key: 'mind_body',     label: 'Mind & Body',      emoji: '🧘', desc: 'Body, mind, the doctor',         group: 'Self' },
  { key: 'salon',         label: 'Grooming',         emoji: '💆', desc: 'A haircut, or more than that',    group: 'Self' },
  { key: 'shopping',      label: 'Shopping',         emoji: '🛍️',  desc: 'Something new',                  group: 'Self' },
  { key: 'plastic_surg',  label: 'Cosmetic surgery', emoji: '✂️',  desc: 'Changing your face',             group: 'Self' },
  { key: 'hobbies',       label: 'Pastimes',         emoji: '🎸', desc: 'Things done for their own sake', group: 'Pursuits' },
  { key: 'education',     label: 'Learning',         emoji: '📚', desc: 'School, and after it',           group: 'Pursuits' },
  { key: 'movies',        label: 'Cinema',           emoji: '🎬', desc: 'A film',                         group: 'Pursuits' },
  { key: 'nightlife',     label: 'Going out',        emoji: '🍸', desc: 'An evening, and other people',   group: 'Pursuits' },
  { key: 'love',          label: 'Love',             emoji: '❤️',  desc: 'The people closest',             group: 'Relationships' },
  { key: 'fertility',     label: 'Children',         emoji: '👶', desc: 'Whether, and when',              group: 'Relationships' },
  { key: 'friends',       label: 'Friends',          emoji: '👥', desc: 'The people you chose',           group: 'Relationships' },
  { key: 'pets',          label: 'Animals',          emoji: '🐾', desc: 'Something to feed',              group: 'Relationships' },
  { key: 'career',        label: 'Career',           emoji: '💼', desc: 'The job, and the next one',      group: 'Work & Money' },
  { key: 'business',      label: 'Business',         emoji: '🏢', desc: 'Something of your own',          group: 'Work & Money' },
  { key: 'assets',        label: 'Property',         emoji: '🏠', desc: 'A house, a bicycle, a car',      group: 'Work & Money' },
  { key: 'money',         label: 'Money',            emoji: '💰', desc: 'Earning, keeping, borrowing',    group: 'Work & Money' },
  { key: 'licenses',      label: 'Licenses',         emoji: '🪪', desc: 'Papers that let you drive',      group: 'Work & Money' },
  { key: 'social_media',  label: 'Online',           emoji: '📱', desc: 'An account, and its audience',   group: 'Social' },
  { key: 'travel',        label: 'Travel',           emoji: '✈️',  desc: 'Away for a while, or for good',  group: 'Social' },
  { key: 'immigration',   label: 'Papers',           emoji: '🛂', desc: 'Residency and citizenship',      group: 'Social' },
  { key: 'crime',         label: 'Crime',            emoji: '⚠️',  desc: 'Against the law',                group: 'Risk' },
  { key: 'substances',    label: 'Drink & drugs',    emoji: '💊', desc: 'Alcohol, and the rest',          group: 'Risk' },
  { key: 'race_tracks',   label: 'The races',        emoji: '🏇', desc: 'A bet on a horse',               group: 'Risk' },
  { key: 'rehab',         label: 'Getting clean',    emoji: '☀️',  desc: 'Stopping',                       group: 'Risk' },
  { key: 'underground',   label: 'On the run',       emoji: '🕵️', desc: 'Staying out of reach',           group: 'Risk' },
  { key: 'prison',        label: 'Inside',           emoji: '🔒', desc: 'The days in prison',             group: 'Risk' },
]

const CATEGORY_GROUP_ORDER = ['Self', 'Pursuits', 'Relationships', 'Work & Money', 'Social', 'Risk']

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
      {cost && <p className="text-xs font-medium" style={{ color: '#3f5670' }}>{cost}</p>}
    </button>
  )
}

export default function ActivitiesPanel({ onClose }) {
  const [activeTop, setActiveTop] = useState(null)
  const [martialDiscipline, setMartialDiscipline] = useState(null)
  const [horseIdx, setHorseIdx] = useState(0)
  const [stakeIdx, setStakeIdx] = useState(0)
  const [murderStep, setMurderStep] = useState(null) // null | 'victim' | 'method'
  const [murderVictim, setMurderVictim] = useState(null)
  const [assaultStep, setAssaultStep] = useState(null) // null | 'victim'
  const [assaultVictim, setAssaultVictim] = useState(null)
  const [assaultCrimeId, setAssaultCrimeId] = useState('assault')
  const [datingAppStep, setDatingAppStep] = useState(null) // null | 'filters' | 'match'
  const [datingFilters, setDatingFilters] = useState({ ageRange: 'any', netWorth: 'any' })

  const state = useGameStore(s => s)
  // A partner who has died stays on state as { alive: false }; every verb here
  // is about the living one. See livingPartner in playerActions.
  const livePartner = livingPartner(state)
  // A price shown must be the price charged. The engine denominates every cost
  // at its definition ($$ in playerActions, localCost for activities); this
  // panel printed the present-day catalogue figure beside it, so 1968 Ohio
  // was offered "Clothes Shopping ~$200" and charged $20.
  const money$ = (n) => `$${Math.round(n).toLocaleString()}`
  const localRange = (a, b) => `${money$(estimateCost(state, a))}–${money$(estimateCost(state, b))}`
  const activityCost = (id) => {
    const a = Object.values(ACTIVITIES).flat().find(x => x?.id === id)
    return a?.cost ? estimateCost(state, a.cost) : 0
  }

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

  const conditions = state.conditions ?? []
  const hasCondition = (id) => conditions.some(c => c.id === id)
  const hasSevereUnmanaged = (id) => conditions.some(c => c.id === id && c.severity === 'severe' && !c.managed)
  const hasModerateOrWorse = (id) => conditions.some(c => c.id === id && (c.severity === 'moderate' || c.severity === 'severe'))
  const anySevereUnmanaged = conditions.some(c => c.severity === 'severe' && !c.managed)
  const physicallyRestricted = hasSevereUnmanaged('disability_injury') || hasSevereUnmanaged('arthritis') || hasSevereUnmanaged('back_pain_chronic')
  const physicalRestrictReason = hasSevereUnmanaged('arthritis') ? 'Severe arthritis limits high-impact activity.' : hasSevereUnmanaged('back_pain_chronic') ? 'Chronic back pain makes this inadvisable.' : hasSevereUnmanaged('disability_injury') ? 'Not possible with your current injury.' : null
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
        // Only what exists here, for this person, today: activityOffered reads
        // the activity's own condition and the place it would happen in.
        const act = (id) => (Object.values(ACTIVITIES).flat().find(x => x?.id === id))
        const offered = (id) => activityOffered(state, id)
        const OfferBtn = ({ id, title, subtitle, danger }) => {
          const a = act(id)
          const cost = activityCost(id)
          return <Btn disabled={noActions || (cost > 0 && (state.money ?? 0) < cost)} danger={danger}
            onClick={() => go(() => takeActivity(id))}
            title={title ?? a?.name} subtitle={subtitle ?? a?.description}
            cost={cost > 0 ? money$(cost) : null} />
        }
        const martial = martialOptions(state)
        const belted = martial.find(m => m.name === ma.discipline)?.belts ?? ['Judo', 'Karate', 'Taekwondo', 'Brazilian Jiu-Jitsu', 'Jiu-Jitsu'].includes(ma.discipline)
        const healthIds = ['doctor', 'dentist', 'therapy_body', 'treat_sti'].filter(offered)
        return (
          <>
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
            {offered('gym') && (
              <>
                {(hasSevereUnmanaged('heart_disease') || hasSevereUnmanaged('copd')) && (
                  <div className="bg-red-50 rounded-xl border border-red-200 px-3 py-2 mb-1 text-xs text-red-700">
                    Hard exercise carries a real risk with your condition. Walking is the safer habit.
                  </div>
                )}
                {physicallyRestricted
                  ? <p className="text-natalis-muted text-xs italic px-1">{physicalRestrictReason}</p>
                  : <OfferBtn id="gym" title="Go to the gym" subtitle="Three evenings a week, all year." />}
              </>
            )}
            {offered('walk') && <OfferBtn id="walk" title="Walk" subtitle="Every day, the same way or a different one." />}
            {offered('meditate') && <OfferBtn id="meditate" title="Sit still" subtitle="Fifteen minutes a day of not doing anything." />}
            {offered('library') && <OfferBtn id="library" title="Go to the library" subtitle="Somewhere quiet, with more books than you will read." />}
            {offered('read') && <OfferBtn id="read" title="Read" subtitle="Everything you can find, this year." />}
            {offered('diet') && <OfferBtn id="diet" title="Eat better" subtitle="Less of some things, more of others, and keep to it." />}
            {offered('gardening') && <OfferBtn id="gardening" title="Grow something" subtitle="A plot, a row of pots, a patch behind the house." />}
            {offered('book_therapy') && <OfferBtn id="book_therapy" title="See a therapist" subtitle="A room, a chair, somebody whose work is listening." />}
            {healthIds.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Health</p>
                {healthIds.includes('doctor') && <OfferBtn id="doctor" title="See a doctor" subtitle="About the thing you have been putting off." />}
                {healthIds.includes('dentist') && <OfferBtn id="dentist" title="See a dentist" subtitle="It has been longer than you meant." />}
                {healthIds.includes('therapy_body') && <OfferBtn id="therapy_body" title="See a physiotherapist" subtitle="For the pain that has started to decide things for you." />}
                {healthIds.includes('treat_sti') && <OfferBtn id="treat_sti" title="Get treated" subtitle="A clinic, a prescription, a conversation you would rather not have." danger />}
              </>
            )}
            {martial.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">
                  Fighting arts {ma.discipline ? `— ${ma.discipline}${belted ? ` (${BELT_NAMES[ma.belt ?? 0]} belt)` : ''}` : ''}
                </p>
                {physicallyRestricted ? (
                  <p className="text-natalis-muted text-xs italic px-1">{physicalRestrictReason ?? 'Your body will not allow it now.'}</p>
                ) : !ma.discipline
                  ? martial.map(m => (
                      <Btn key={m.name} disabled={noActions} onClick={() => go(() => practiceMartalArts(m.name))} title={`Take up ${m.name}`} subtitle="Twice a week, with people who will hit you." />
                    ))
                  : <Btn disabled={noActions} onClick={() => go(() => practiceMartalArts(ma.discipline))} title={`Train`} subtitle={`${ma.discipline}, twice a week.`} />
                }
              </>
            )}
          </>
        )
      }

      case 'education': {
        const enrolled = state.education?.enrolled
        const gpa = state.gpa
        // Studying harder, and the school clubs, need a school. A child the
        // engine had told "There is no school to start" was offered both.
        const schooled = !state.flags.includes('never_schooled') && state.mem?.attendedSchool !== false
        const inSchool = !!enrolled || (schooled && state.age >= 10 && state.age <= 18)
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
                  <div className="h-full rounded-full" style={{ width: `${((enrolled.year ?? 0) / (enrolled.type === 'university' ? 4 : 2)) * 100}%`, background: '#3f5670' }} />
                </div>
              </div>
            )}
            {gpa !== null && (
              <div className="flex items-center justify-between bg-white rounded-xl border border-natalis-border px-4 py-3">
                <span className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">Marks</span>
                <span className="font-bold text-sm" style={{ color: gpa >= 3.5 ? '#3f6146' : gpa >= 2.5 ? '#8a6635' : '#8c3a2e' }}>{gpa.toFixed(2)}</span>
              </div>
            )}
            {inSchool && (
              <Btn disabled={noActions} onClick={() => go(studyHarder)} title="Study harder" subtitle="The extra hours, at the kitchen table." />
            )}
            {enrolled && (
              <Btn disabled={false} onClick={() => go(dropOutOfSchool)} title="Drop Out" subtitle="Leave your program early." danger />
            )}
            {(ACTIVITIES.mind ?? [])
              .filter(a => ['study', 'online_course', 'learn_language', 'philosophy'].includes(a.id))
              .filter(a => a.id !== 'study' || inSchool)
              .filter(a => activityOffered(state, a.id))
              .map(a => (
                <Btn key={a.id} disabled={noActions} onClick={() => go(() => takeActivity(a.id))} title={a.name} subtitle={a.description} cost={a.cost > 0 ? money$(estimateCost(state, a.cost)) : null} />
              ))
            }
            {inSchool && state.age <= 18 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">After school</p>
                {(ACTIVITIES.extracurricular ?? [])
                  .filter(a => activityOffered(state, a.id))
                  .filter(a => a.id !== 'coding_club' || hasTech(placeNow(state).c, 'personal_computer', state.currentYear))
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
        // The partner card was a BitLife stat sheet: four coloured bars —
        // Looks, Smarts, Money and CRAZINESS — a "Birth Gender" field, a
        // five-times-size emoji face and a hot-pink gradient header, in a
        // paper-and-ink game whose design document says "Invisible systems.
        // Partner traits... none of these appear in the UI" and rules out
        // gradients on controls. (`pink` is also one of two Tailwind scales the
        // remap misses, so it was the real #ec4899.)
        //
        // The numbers still decide everything they decided. They are now a
        // sentence, which is the whole principle: a system that makes a
        // sentence land differently has succeeded.
        const impressionOf = (pr) => {
          const bits = []
          if (pr.looks >= 78) bits.push('People look at them twice and they have clearly known that for years')
          else if (pr.looks >= 55) bits.push('Good-looking in a way you would not have been able to describe afterwards')
          else if (pr.looks <= 30) bits.push('Not the first person you would have noticed in the room')
          if (pr.smarts >= 78) bits.push('quick, and slightly impatient with people who are not')
          else if (pr.smarts <= 32) bits.push('not interested in being clever about anything, which is restful')
          if (pr.wealthStat >= 75) bits.push('comfortable in a way that has never had to be thought about')
          else if (pr.wealthStat <= 25) bits.push('counting, and not hiding it')
          if (pr.craziness >= 75) bits.push('and there is something going on there that you cannot place yet')
          else if (pr.craziness <= 20) bits.push('and entirely steady, which you will either love or find dull')
          if (!bits.length) bits.push('Perfectly ordinary, which is most people, which is the point')
          return bits.join(', ') + '.'
        }

        const PartnerProfileCard = ({ profile, onAccept, onDecline, acceptLabel = 'See them again', declineLabel = 'Let it go' }) => (
          <div className="bg-natalis-surface rounded-2xl border border-natalis-border overflow-hidden mb-2">
            <div className="px-5 pt-4 pb-3 border-b border-natalis-rule">
              <p className="text-natalis-text font-prose text-prose-lg leading-tight">{profile.name}</p>
              <p className="text-natalis-muted text-xs mt-1">
                {profile.occupation}{profile.age ? ` · ${profile.age}` : ''}
              </p>
            </div>
            <p className="px-5 py-4 text-natalis-dim font-prose text-sm leading-relaxed">
              {impressionOf(profile)}
            </p>
            <div className="px-4 pb-4 grid grid-cols-2 gap-2">
              <button
                onClick={onAccept}
                className="py-3 rounded-xl text-sm border border-natalis-accent text-natalis-accent active:scale-95 transition-all"
              >
                {acceptLabel}
              </button>
              <button
                onClick={onDecline}
                className="py-3 rounded-xl text-sm border border-natalis-border bg-natalis-bg text-natalis-muted active:scale-95 transition-all"
              >
                {declineLabel}
              </button>
            </div>
          </div>
        )

        // ── Pending partner (organic meet) ───────────────────────────────────
        if (pendingPartner && !livePartner) {
          return (
            <>
              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1 mb-1">You meet someone...</p>
              <PartnerProfileCard
                profile={pendingPartner}
                acceptLabel="See them again"
                declineLabel="Let it go"
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

        const datingFee = estimateCost(state, 100)
        const pl = placeNow(state)
        const hasPhoneHere = hasTech(pl.c, 'landline', pl.year, { rural: pl.rural }) || hasTech(pl.c, 'mobile_phone', pl.year, { rural: pl.rural })
        if (datingAppStep === 'filters') {
          const selectedAge = AGE_RANGES.find(r => r.value === datingFilters.ageRange) ?? AGE_RANGES[0]
          const selectedNW = NET_WORTH_OPTIONS.find(r => r.value === datingFilters.netWorth) ?? NET_WORTH_OPTIONS[0]
          return (
            <>
              <button onClick={() => setDatingAppStep(null)} className="text-bit-blue text-sm font-semibold mb-3">← Back</button>
              {/* Dating app header card */}
              <div className="bg-natalis-bg border border-natalis-rule rounded-2xl px-5 py-4 mb-4">
                <p className="font-bold text-lg">{datingAppLabel(state)}</p>
                <p className="text-natalis-muted text-xs mt-0.5">A fee per search. Whether that is a good way to meet somebody is a separate question.</p>
              </div>

              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Pick your desired age</p>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                {AGE_RANGES.map(r => (
                  <button key={r.value} onClick={() => setDatingFilters(f => ({ ...f, ageRange: r.value }))}
                    className="py-2 px-2 rounded-xl border text-xs font-semibold transition-all active:scale-95"
                    style={{
                      background: datingFilters.ageRange === r.value ? '#7b4356' : 'white',
                      color: datingFilters.ageRange === r.value ? 'white' : '#7d766a',
                      borderColor: datingFilters.ageRange === r.value ? '#7b4356' : '#e2ddd2',
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
                      background: datingFilters.netWorth === r.value ? '#f8eef0' : 'white',
                      color: datingFilters.netWorth === r.value ? '#663747' : '#403b33',
                      borderColor: datingFilters.netWorth === r.value ? '#7b4356' : '#e2ddd2',
                    }}>
                    {r.label}
                    {datingFilters.netWorth === r.value && <span className="float-right text-pink-400">✓</span>}
                  </button>
                ))}
              </div>

              <button
                disabled={noActions || (state.money ?? 0) < datingFee}
                onClick={() => {
                  const ageOpts = AGE_RANGES.find(r => r.value === datingFilters.ageRange) ?? {}
                  const nwOpts = NET_WORTH_OPTIONS.find(r => r.value === datingFilters.netWorth) ?? {}
                  useDatingApp({ minAge: ageOpts.minAge, maxAge: ageOpts.maxAge, minWealthStat: nwOpts.minWealthStat })
                  setDatingAppStep('match')
                }}
                className="w-full py-3 rounded-xl font-bold text-white text-sm active:scale-95 disabled:opacity-40 transition-all"
                style={{ background: '#7b4356' }}
              >
                Search · {money$(datingFee)}
              </button>
            </>
          )
        }

        if (datingAppStep === 'match' && pendingPartner) {
          return (
            <>
              <button onClick={() => { setDatingAppStep('filters'); declinePartner() }} className="text-bit-blue text-sm font-semibold mb-2">← Search again</button>
              <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1 mb-1">Your match</p>
              <PartnerProfileCard
                profile={pendingPartner}
                acceptLabel="Meet them"
                declineLabel="Not this one"
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
            {state.age >= 16 && !livePartner && (
              <>
                <Btn disabled={noActions || isHomeless} onClick={() => meetSomeone()} title="Meet somebody" subtitle={isHomeless ? "Not possible without a stable address." : "Say yes to the things you would usually say no to."} />
                {state.age >= 18 && datingAppAvailable(state) && (
                  <Btn
                    disabled={noActions || (state.money ?? 0) < datingFee}
                    onClick={() => setDatingAppStep('filters')}
                    title={datingAppLabel(state)}
                    subtitle="Strangers, sorted by what they said about themselves."
                    cost={`${money$(datingFee)} a search`}
                  />
                )}
              </>
            )}
            {state.age >= 16 && (
              <Btn disabled={noActions} onClick={() => go(hookUp)} title="A night with somebody" subtitle="Nothing promised, on either side." />
            )}
            {livePartner && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-1">{livePartner.name}</p>
                <Btn disabled={noActions} onClick={() => go(goOnDate)} title="An evening out together" subtitle={`Just you and ${livePartner.name.split(' ')[0]}.`} cost={localRange(40, 180)} />
                <Btn disabled={noActions} onClick={() => go(complimentPartner)} title="Say something kind" subtitle="Something true, that you usually leave unsaid." />
                {!livePartner.engaged && !livePartner.married && (
                  <Btn disabled={noActions} onClick={() => go(proposeMarriage)} title="Marriage" subtitle="Ask, or let it be known you would say yes." />
                )}
                {livePartner.engaged && !livePartner.married && (
                  <Btn disabled={noActions} onClick={() => go(getMarried)} title="The wedding" subtitle="The families, the day, the cost of it." cost={localRange(800, 18000)} />
                )}
                {livePartner.married && (
                  <Btn disabled={noActions || state.birthControl} onClick={() => go(tryForChild)} title="Try for a child" subtitle={state.birthControl ? "Not while you are preventing one." : "This year, on purpose."} />
                )}
                <Btn disabled={noActions} onClick={() => go(fileForDivorce)}
                  title={livePartner.married ? (divorceLegal(state) ? 'Divorce' : 'Separate') : 'End it'}
                  subtitle={livePartner.married && !divorceLegal(state) ? 'There is no divorce here. You can live apart.' : 'There is no version of this that does not hurt.'} danger />
              </>
            )}
            {state.children.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Children</p>
                {state.children.map((child, i) => (
                  <Btn key={i} disabled={noActions} onClick={() => go(() => spendTimeWithChild(i))} title={`Time with ${child.name.split(' ')[0]}`} subtitle="Nothing planned. That is the point." />
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
                  return <Btn key={key} disabled={noActions} onClick={() => go(() => callParent(key))} title={hasPhoneHere ? `Call your ${key}` : `Visit your ${key}`} subtitle={p.name} />
                })}
              </>
            )}
            {state.siblings && state.siblings.filter(s => s.alive).map((sib, i) => {
              const realIdx = state.siblings.indexOf(sib)
              return <Btn key={i} disabled={noActions} onClick={() => go(() => callSibling(realIdx))} title={`${hasPhoneHere ? 'Call' : 'Visit'} ${sib.name.split(' ')[0]}`} subtitle={sib.gender === 'female' ? 'Your sister.' : sib.gender === 'male' ? 'Your brother.' : 'Your sibling.'} />
            })}
            {state.age >= 25 && state.age <= 55 && adoptionExists(state) && (
              <Btn disabled={noActions || (state.money ?? 0) < adoptionPrice(state)} onClick={() => go(adoptChild)} title="Adopt a child" subtitle="An agency, a home study, a long wait." cost={money$(adoptionPrice(state))} />
            )}
          </>
        )
      }

      case 'fertility': {
        return (
          <>
            <div className="flex items-center justify-between bg-white rounded-xl border border-natalis-border px-4 py-3 mb-1">
              <span className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">Birth Control</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: state.birthControl ? '#3f6146' : '#8c3a2e' }}>
                {state.birthControl ? 'ON' : 'OFF'}
              </span>
            </div>
            <Btn
              disabled={false}
              onClick={() => go(toggleBirthControl)}
              title={state.birthControl ? 'Stop preventing a pregnancy' : 'Prevent a pregnancy'}
              subtitle={state.birthControl ? 'For now, nothing will happen by accident.' : (state.currentYear < 1960 ? 'Such as there is: counting days, and luck.' : 'The pill, a coil, whatever the clinic has.')}
            />
            {livePartner && !state.birthControl && state.age < 50 && (
              <Btn disabled={noActions} onClick={() => go(tryForChild)} title="Try for a child" subtitle="This year, on purpose." />
            )}
            {activityOffered(state, 'sterilization') && (
              <Btn
                disabled={noActions}
                onClick={() => go(() => takeActivity('sterilization'))}
                title={state.character?.gender === 'male' ? 'Vasectomy' : 'Tubal Ligation'}
                subtitle="Not designed to be undone."
                cost={money$(activityCost('sterilization'))}
                danger
              />
            )}
          </>
        )
      }

      case 'nightlife': {
        const out = goingOutAvailable(state)
        return (
          <>
            {out && (
              <Btn disabled={noActions} onClick={() => go(goClubbing)}
                title={state.currentYear < 1965 ? 'The dance hall' : 'A night out'}
                subtitle={state.currentYear < 1965 ? 'Saturday, the band, the walk home after.' : 'Music too loud to talk over, which is the point.'}
                cost={localRange(50, 120)} />
            )}
            {(ACTIVITIES.social ?? []).filter(a => ['volunteer', 'join_club'].includes(a.id)).filter(a => activityOffered(state, a.id)).map(a => (
              <Btn key={a.id} disabled={noActions} onClick={() => go(() => takeActivity(a.id))} title={a.name} subtitle={a.description} />
            ))}
          </>
        )
      }

      case 'movies': {
        return (
          <>
            <Btn disabled={noActions} onClick={() => go(goToMovies)} title={state.currentYear < 1960 ? 'The pictures' : 'See a film'} subtitle="Two hours in the dark with strangers." cost={localRange(15, 25)} />
          </>
        )
      }

      case 'salon': {
        return salonOptions(state).map(o => (
          <Btn key={o.id} disabled={noActions || (state.money ?? 0) < o.cost} onClick={() => go(() => visitSalonSpa(o.id))} title={o.label} subtitle={o.desc} cost={money$(o.cost)} />
        ))
      }

      case 'shopping': {
        return shoppingOptions(state).map(o => (
          <Btn key={o.id} disabled={noActions || (state.money ?? 0) < o.cost} onClick={() => go(() => goShopping(o.id))} title={o.label} subtitle={o.desc} cost={money$(o.cost)} />
        ))
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
                {sm.genre && <span className="text-xs font-medium text-natalis-dim border border-natalis-rule px-2 py-0.5 rounded-full capitalize">{sm.genre}</span>}
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
        const surgeries = surgeryOptions(state)
        return (
          <>
            {state.age >= 75 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-2 text-xs text-amber-800">
                At your age an anaesthetic is not a small thing.
              </div>
            )}
            {(hasSevereUnmanaged('heart_disease') || hasSevereUnmanaged('copd')) && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-2 text-xs text-red-700">
                A general anaesthetic carries a serious risk with your heart or lungs.
              </div>
            )}
            {surgeries.map(o => (
              <Btn key={o.id} disabled={noActions || (state.money ?? 0) < o.cost} onClick={() => go(() => getPlasticSurgery(o.id))} title={o.label} subtitle={o.desc} cost={money$(o.cost)} />
            ))}
          </>
        )
      }

      case 'race_tracks': {
        // Plain names, local stakes, and the tote's share kept. The card used
        // to be "Thunderhooves" and "Lucky Lightning" under a slot-machine
        // button with fixed bets of $50 to $1,000 in any year.
        const card = raceCard(state)
        const stakes = raceStakes(state)
        const stake = stakes[stakeIdx] ?? stakes[0]
        return (
          <>
            <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1 py-1">The card</p>
            {card.map((horse, i) => (
              <button
                key={horse}
                onClick={() => setHorseIdx(i)}
                className="w-full text-left px-4 py-3 rounded-xl border transition-all text-sm active:scale-95"
                style={{
                  background: horseIdx === i ? '#f3efe6' : 'white',
                  color: '#403b33',
                  borderColor: horseIdx === i ? '#3f5670' : '#e2ddd2',
                }}
              >
                {i + 1}. {horse}
              </button>
            ))}
            <div className="pt-2 space-y-2">
              <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">Stake</p>
              <div className="flex gap-2">
                {stakes.map((amt, i) => (
                  <button key={i} onClick={() => setStakeIdx(i)}
                    className="flex-1 py-2 text-xs rounded-xl border transition-all active:scale-95"
                    style={{
                      background: stakeIdx === i ? '#f3efe6' : 'white',
                      color: '#403b33',
                      borderColor: stakeIdx === i ? '#3f5670' : '#e2ddd2',
                    }}>
                    {money$(amt)}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-1">
              <Btn
                disabled={noActions || (state.money ?? 0) < stake}
                onClick={() => go(() => betOnHorses(horseIdx, stakeIdx))}
                title={`${money$(stake)} on ${card[horseIdx]}`}
                subtitle="Four to one if it comes in first."
              />
            </div>
          </>
        )
      }

      case 'rehab': {
        return (
          <>
            {hasAddiction && rehabExists(state) && (
              <Btn disabled={noActions} onClick={() => go(goToRehab)} title="A residential programme" subtitle="Weeks away, and the hard part after." cost={localRange(5000, 25000)} />
            )}
            {['quit_smoking', 'rehab'].filter(id => activityOffered(state, id)).map(id => {
              const a = (ACTIVITIES.body ?? []).find(x => x.id === id)
              return <Btn key={id} disabled={noActions} onClick={() => go(() => takeActivity(id))}
                title={id === 'quit_smoking' ? 'Stop smoking' : 'Get help to stop'} subtitle={id === 'quit_smoking' ? 'Again.' : 'A programme, a sponsor, the meetings.'}
                cost={a?.cost ? money$(activityCost(id)) : null} />
            })}
          </>
        )
      }

      case 'pets': {
        const livePets = (state.pets ?? []).filter(p => p.alive)
        const pl = placeNow(state)
        return (
          <>
            {livePets.length > 0 && (pl.wealthy || !pl.rural) && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Yours</p>
                {livePets.map(pet => {
                  const allIdx = (state.pets ?? []).indexOf(pet)
                  return (
                    <Btn key={allIdx} disabled={noActions} onClick={() => go(() => visitVet(allIdx))} title={`Take ${pet.name} to the vet`} subtitle={`${pet.species}, ${pet.age} years old`} cost={localRange(150, 600)} />
                  )
                })}
              </>
            )}
            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Take one in</p>
            {petOptions(state).map(o => (
              <Btn key={o.id} disabled={noActions || (state.money ?? 0) < o.fee} onClick={() => go(() => adoptPet(o.id))} title={`A ${o.id}`} subtitle={o.desc} cost={o.fee > 0 ? money$(o.fee) : null} />
            ))}
          </>
        )
      }

      case 'licenses': {
        return licenceOptions(state).map(o => (
          <Btn key={o.id} disabled={noActions || o.held || (state.money ?? 0) < o.cost} onClick={() => go(() => obtainLicense(o.id))}
            title={o.held ? `${o.label}, held` : o.label}
            subtitle={o.held ? 'In the drawer with the other papers.' : o.id === 'driver' ? 'Lessons, a test, a card with your photograph on it.' : 'Courses, hours, an examination.'}
            cost={o.held ? null : money$(o.cost)} />
        ))
      }

      case 'assets': {
        const properties = state.assets?.properties ?? []
        const vehicles = state.assets?.vehicles ?? []
        const homes = propertyOptions(state)
        const rides = vehicleOptions(state)
        const TIER_LABELS = {
          bicycle: 'Bicycles', motorcycle: 'Motorcycles', used_car: 'Second-hand cars',
          new_car: 'New cars', luxury_car: 'Expensive cars', supercar: 'Very expensive cars', watercraft: 'Boats',
        }
        const tierKeys = ['bicycle', 'motorcycle', 'used_car', 'new_car', 'luxury_car', 'supercar', 'watercraft']
        return (
          <>
            {isHomeless && (
              <div className="bg-amber-50 rounded-xl border border-amber-200 px-3 py-2 mb-2 text-xs text-amber-700">
                Buying anywhere needs an address to buy from.
              </div>
            )}
            {homes.length > 0 && <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Somewhere to live</p>}
            {homes.map(type => (
              <Btn key={type.id} disabled={noActions || (state.money ?? 0) < type.deposit || isHomeless}
                onClick={() => { buyProperty(type.id); onClose() }}
                title={type.name} subtitle={type.description}
                cost={`${money$(type.price)} · deposit ${money$(type.deposit)}`} />
            ))}
            {properties.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Sell</p>
                {properties.map((p, i) => (
                  <Btn key={i} onClick={() => { sellProperty(i); onClose() }} title={`Sell the ${p.name.toLowerCase()}`} subtitle={`Worth ${money$(p.currentValue)}${p.mortgage > 0 ? ` · ${money$(p.mortgage)} still owed on it` : ''}`} danger />
                ))}
              </>
            )}
            {tierKeys.map(tier => {
              const tierVehicles = rides.filter(t => t.tier === tier)
              if (tierVehicles.length === 0) return null
              return (
                <div key={tier}>
                  <p className="text-natalis-muted text-xs font-semibold px-1 pt-2 pb-1">{TIER_LABELS[tier]}</p>
                  {tierVehicles.map(type => (
                    <Btn key={type.id} disabled={noActions || (state.money ?? 0) < type.price}
                      onClick={() => { buyVehicle(type.id); onClose() }}
                      title={`${type.make} ${type.model}`}
                      subtitle={type.description}
                      cost={`${money$(type.price)} · ${money$(type.upkeep)} a year to keep`} />
                  ))}
                </div>
              )
            })}
            {vehicles.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Sell</p>
                {vehicles.map((v, i) => (
                  <Btn key={i} onClick={() => { sellVehicle(i); onClose() }} title={`Sell the ${v.name}`} subtitle={`Worth ${money$(v.currentValue)}`} danger />
                ))}
              </>
            )}
          </>
        )
      }

      case 'money': {
        const debt = state.debt ?? 0
        const money = state.money ?? 0
        const loan = paydayOffer(state)
        const benefits = benefitsOffer(state)
        const bankrupt = bankruptcyOpen(state)
        return (
          <>
            {state.age >= 18 && (
              <>
                {money < loan.receive && (
                  <Btn
                    danger
                    disabled={noActions}
                    onClick={() => { takePaydayLoan(); onClose() }}
                    title={loan.label}
                    subtitle={loan.desc}
                    cost={`${money$(loan.receive)} now · ${money$(loan.owe)} owed`}
                  />
                )}
                {!state.career && benefits && money < benefits.threshold && (
                  <Btn
                    disabled={noActions}
                    onClick={() => { applyForBenefits(); onClose() }}
                    title="Apply for assistance"
                    subtitle="The forms, the queue, the questions about why."
                    cost={`About ${money$(benefits.payment)}`}
                  />
                )}
                {bankrupt && (
                  <Btn
                    danger
                    onClick={() => { declareBankruptcy(); onClose() }}
                    title="File for bankruptcy"
                    subtitle={`${money$(debt)} owed. The debts go; so do the car, the credit, and something harder to name.`}
                  />
                )}
              </>
            )}
            {(ACTIVITIES.money ?? [])
              .filter(a => activityOffered(state, a.id))
              .map(a => {
                const cost = a.cost > 0 ? estimateCost(state, a.cost) : 0
                return <Btn key={a.id} disabled={noActions || (cost > 0 && money < cost)} onClick={() => go(() => takeActivity(a.id))} title={a.name} subtitle={a.description} cost={cost > 0 ? money$(cost) : null} />
              })
            }
          </>
        )
      }

      case 'crime': {
        // Victim archetypes and homicide methods now live in src/data/crimes.js.
        // The copies that used to sit here carried the emoji-and-punchline register
        // ("A homeless person 🏚️ — Unlikely anyone will notice", "Elephant Laxative")
        // that the rest of the game does not use for anything else it takes seriously.
        const STRANGER_VICTIMS = VIOLENT_TARGETS
        const MURDER_METHODS = HOMICIDE_METHODS

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
            ...(livePartner ? [{ label: `${livePartner.name} (Partner)`, key: 'known_partner', isKnown: true }] : []),
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
                        // Arrested, not sentenced. Going straight to a cell here
                        // skipped the trial system entirely — the lawyer tiers and
                        // the regime's legal quality never applied to minigame crimes.
                        const sent = calcSentence(assaultCrime)
                        return { ...s, actionsThisYear: (s.actionsThisYear ?? 0) + 1,
                          pendingTrial: sent > 0 ? buildPendingTrial(s, assaultCrime, sent) : s.pendingTrial,   // never discard a charge that has not been tried
                          criminalRecord: [...(s.criminalRecord ?? []), { crime: assaultCrime.criminalRecordEntry, age: s.age, category: 'violent' }],
                          log: [...(s.log ?? []), { age: s.age, text: `You are arrested for ${assaultCrime.name.toLowerCase()}.`, isKey: true }] }
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
                  const baseRisk = assaultCrime ? crimeArrestRisk(assaultCrime, state) : 0.40
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
                          return { ...s, actionsThisYear: (s.actionsThisYear ?? 0) + 1,
                            pendingTrial: sent > 0 && assaultCrime ? buildPendingTrial(s, assaultCrime, sent) : s.pendingTrial,   // never discard a charge that has not been tried
                            criminalRecord: [...(s.criminalRecord ?? []), { crime: assaultCrime?.criminalRecordEntry ?? 'Assault', age: s.age, category: 'violent' }],
                            log: [...(s.log ?? []), { age: s.age, text: `You are arrested for ${(assaultCrime?.name ?? 'assault').toLowerCase()}.`, isKey: true }] }
                        }
                        return { ...s, stats: { ...s.stats, health: Math.max(0, s.stats.health - 15) }, actionsThisYear: (s.actionsThisYear ?? 0) + 1, log: [...(s.log ?? []), { age: s.age, text: `You get beaten by ${v.label.toLowerCase()}.`, isKey: false }] }
                      },
                    },
                  })
                }} title={v.label} subtitle={v.desc} cost={`Arrest risk: ${Math.round(Math.max(0.05, Math.min(0.95, (assaultCrime ? crimeArrestRisk(assaultCrime, state) : 0.4) + v.arrestMod)) * 100)}%`} />
              ))}
            </>
          )
        }

        // Murder victim selection flow
        if (murderStep === 'victim') {
          const knownVictims = [
            ...(livePartner ? [{ label: `${livePartner.name} (Partner)`, key: 'partner' }] : []),
            ...(state.parents?.mother?.alive ? [{ label: `${state.parents.mother.name} (Mother)`, key: 'mother' }] : []),
            ...(state.parents?.father?.alive ? [{ label: `${state.parents.father.name} (Father)`, key: 'father' }] : []),
            ...((state.siblings ?? []).filter(s => s.alive).map((s, i) => ({ label: `${s.name} (Sibling)`, key: `sibling_${i}`, idx: i }))),
            ...((state.children ?? []).filter(c => c.alive !== false).map((c, i) => ({ label: `${c.name.split(' ')[0]} (Child)`, key: `child_${i}`, idx: i }))),
            ...((state.friends ?? []).filter(f => f.alive).map((f, i) => ({ label: `${f.name} (Friend)`, key: `friend_${i}`, idx: i }))),
            ...((state.exPartners ?? []).filter(e => e.alive !== false).map((e, i) => ({ label: `${e.name} (Ex)`, key: `ex_${i}`, idx: i }))),
          ]
          const strangerVictimsForMurder = STRANGER_VICTIMS.map(v => ({
            label: `${v.label} (Stranger)`, key: v.key, isStranger: true, detectionMod: v.detectionMod, desc: v.desc,
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
                  title={v.label}
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
                          actionsThisYear: (s.actionsThisYear ?? 0) + 1,
                          karma: Math.max(0, (s.karma ?? 50) - 20),
                          pendingTrial: failSentence > 0
                            ? buildPendingTrial(s, { name: 'Attempted murder', category: 'violent' }, failSentence)
                            : s.pendingTrial,
                          criminalRecord: [...(s.criminalRecord ?? []), { crime: 'Attempted murder', age: s.age, category: 'violent' }],
                          log: [...(s.log ?? []), { age: s.age, text: 'You are arrested for attempted murder.', isKey: true }],
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
            // A verb offered is a verb that works. Ransomware and crypto fraud
            // were listed in 1996 and answered "This type of crime doesn't
            // exist yet"; hacking, which runs through a minigame and never
            // reaches attemptCrime, could be done in 1955.
            if (crime.requiresYear && (state.currentYear ?? 0) < crime.requiresYear) return null
            // Insider trading was offered to a trucker. Access is a precondition.
            if (crimeBarred(state, crime)) return null
            const beyondThem = crime.minSmarts && (state.stats?.smarts ?? 0) < crime.minSmarts
            const canAfford = !crime.wealthRequirement || state.character?.wealthTier >= crime.wealthRequirement
            const risk = crimeArrestRisk(crime, state)
            if (crime.id === 'murder') {
              return (
                <Btn key="murder" disabled={noActions} danger
                  onClick={() => setMurderStep('victim')}
                  title="Murder"
                  subtitle="Choose who, and how. Getting away with it is not something you can choose."
                />
              )
            }
            if (crime.id === 'assault' || crime.id === 'aggravated_assault') {
              return (
                <Btn key={crime.id} disabled={noActions} danger
                  onClick={() => { setAssaultCrimeId(crime.id); setAssaultStep('victim') }}
                  title={crime.name}
                  subtitle={crime.description}
                  cost={`Arrest risk: ${Math.round(risk * 100)}%`}
                />
              )
            }
            const handleCrime = () => {
              if (crime.minigame) {
                onClose()
                // Winning the minigame used to skip the arrest roll entirely and
                // paid present-day dollars at the BIRTH country's wage scale into
                // any year. Doing it well halves the risk of being caught; it
                // does not remove it. The take is priced like attemptCrime's:
                // local goods, in the money of the year, where the character is.
                const caughtAnyway = Math.random() < risk * 0.5
                const sentence = calcSentence(crime)
                const arrested = (s) => ({
                  ...s,
                  actionsThisYear: (s.actionsThisYear ?? 0) + 1,
                  pendingTrial: sentence > 0 ? buildPendingTrial(s, crime, sentence) : s.pendingTrial,   // never discard a charge that has not been tried
                  criminalRecord: [...(s.criminalRecord ?? []), { crime: crime.criminalRecordEntry ?? crime.name, age: s.age, category: crime.category ?? 'other' }],
                  log: [...(s.log ?? []), { age: s.age, text: `You are arrested for ${crime.name.toLowerCase()}.`, isKey: true }],
                })
                triggerMinigame({
                  ...crime.minigame,
                  onSuccess: {
                    outcome: caughtAnyway ? 'It goes the way you planned. Somebody was watching anyway.' : (crime.minigame.successOutcome ?? 'It goes the way you planned.'),
                    effect: (s) => {
                      if (caughtAnyway) return arrested(s)
                      const next = { ...s }
                      next.money = (next.money ?? 0) + crimeHaul(s, crime)
                      next.karma = Math.max(0, (next.karma ?? 50) + (crime.minigame.karmaHit ?? -8))
                      next.flags = [...new Set([...next.flags, ...(crime.addFlag ? [crime.addFlag] : [])])]
                      next.actionsThisYear = (next.actionsThisYear ?? 0) + 1
                      next.log = [...(next.log ?? []), { age: s.age, text: `Nobody comes. The ${crime.name.toLowerCase()} is done, and the money is in your pocket.`, isKey: false }]
                      return next
                    },
                  },
                  onFailure: {
                    outcome: crime.minigame.failOutcome ?? 'You are caught.',
                    effect: arrested,
                  },
                })
              } else {
                go(() => commitCrime(crime.id))
              }
            }
            return (
              <Btn key={crime.id} disabled={noActions || !canAfford || beyondThem}
                onClick={handleCrime}
                title={crime.name}
                subtitle={beyondThem ? 'You do not know how to do this.' : crime.description}
                cost={`Arrest risk: ${Math.round(risk * 100)}%`}
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
          if (career.gdpRequired && career.gdpRequired !== 'any' && gdpOrder.indexOf((state.currentCountry ?? state.character.country).gdp) < gdpOrder.indexOf(career.gdpRequired)) return false
          if (Array.isArray(career.archetypeAvailable) && !career.archetypeAvailable.includes((state.currentCountry ?? state.character.country).archetype)) return false
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
                <p className="text-red-700 text-sm font-semibold">Formal work is not an option</p>
                <p className="text-red-600 text-xs mt-0.5">Any employer will run a background check. You need cash work or a false identity first.</p>
              </div>
            )}
            {hasAssumedId && (state.wanted || state.flags.includes('escaped_prisoner')) && (
              <div className="px-3 py-3 rounded-xl border border-yellow-200 bg-yellow-50 mb-1">
                <p className="text-yellow-700 text-sm font-semibold">Working under another name</p>
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
                <Btn disabled={noActions} onClick={() => go(workHarder)} title="Work harder" subtitle={anySevereUnmanaged ? "With your condition, the body will pay more of this." : "Earlier, later, and the body pays."} />
                <Btn disabled={noActions} onClick={() => go(schmoozeBoss)} title="Get on the right side of the boss" subtitle="It works on some of them." />
                <Btn disabled={noActions} onClick={() => go(askForRaise)} title="Ask for more money" subtitle="Whether they say yes depends on the work, and on you." />
                <Btn disabled={noActions} onClick={() => go(quitJob)} title="Leave the job" subtitle={`No longer ${state.career.title.toLowerCase()}.`} danger />
              </>
            )}
            {state.age >= 55 && !state.retired && (
              <Btn onClick={() => go(retire)} title="Retire" subtitle="End your working life on your own terms." />
            )}
            {state.retired && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Retirement</p>
                {activityOffered(state, 'volunteer') && <Btn disabled={noActions} onClick={() => go(() => takeActivity('volunteer'))} title="Volunteer" subtitle="Give time to a cause. The weeks have a different shape." />}
                {activityOffered(state, 'mentor_young') && <Btn disabled={noActions} onClick={() => go(() => takeActivity('mentor_young'))} title="Teach somebody the work" subtitle="Pass on what you know. More useful than it sounds." />}
                {activityOffered(state, 'write_memoirs') && <Btn disabled={noActions} onClick={() => go(() => takeActivity('write_memoirs'))} title="Write it down" subtitle="The life, for yourself or for anyone who asks." />}
                {!physicallyRestricted && state.age < 80 && activityOffered(state, 'walk') && <Btn disabled={noActions} onClick={() => go(() => takeActivity('walk'))} title="Walk" subtitle="The retired body does better with a routine." />}
              </>
            )}
            {!isBlockedFromFormal && available.length > 0 && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Available Careers</p>
                {available.map(career => (
                  <Btn key={career.id} onClick={() => { enterCareer(career.id); onClose() }}
                    title={`${career.levels[0].title}${career.partTime ? ' (part-time)' : ''}`}
                    subtitle={career.description}
                    cost={(() => { const [lo, hi] = startingSalaryRange(state, career) ?? [0, 0]; return `${money$(lo)}–${money$(hi)}/yr` })()} />
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
          const qColor = q > 65 ? '#3f6146' : q > 35 ? '#8a6635' : '#8c3a2e'
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
                  { action: 'hangout',    label: 'Spend time',  cost: money$(estimateCost(state, 30)) },
                  { action: 'compliment', label: 'Say something kind', cost: '' },
                  { action: 'gift',       label: 'A present',   cost: money$(estimateCost(state, 100)) },
                  { action: 'prank',      label: 'A joke at their expense', cost: '' },
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
            {substanceOptions(state).map(o => (
              <Btn key={o.id} disabled={noActions || (state.money ?? 0) < o.cost} onClick={() => go(() => useSubstance(o.id))} title={o.label} subtitle={o.desc} cost={money$(o.cost)} danger={o.hard} />
            ))}
          </>
        )
      }

      case 'hobbies': {
        return (ACTIVITIES.hobbies ?? [])
          .filter(a => activityOffered(state, a.id))
          .map(a => {
            const cost = a.cost > 0 ? estimateCost(state, a.cost) : 0
            return (
              <Btn key={a.id} disabled={noActions || (state.money ?? 0) < cost}
                onClick={() => go(() => takeActivity(a.id))}
                title={a.label}
                subtitle={a.desc}
                cost={cost > 0 ? money$(cost) : null}
              />
            )
          })
      }

      case 'travel': {
        if (state.age < 16) return <p className="text-natalis-muted text-sm italic p-3">Too young to go anywhere alone.</p>
        const visited = (state.travels ?? []).map(t => t.id)
        const trips = tripOptions(state)
        const regions = [
          { key: 'domestic',      label: 'Inside the country' },
          { key: 'regional',      label: 'Nearby' },
          { key: 'international', label: 'Far' },
          { key: 'luxury',        label: 'Expensive' },
        ]
        // Emigration: the handful of places somebody from here, now, would
        // think of — not the roster in alphabetical order with its internal
        // archetype ids and one moving cost for all of them.
        const { closed, options } = emigrationOptions(state)
        return (
          <>
            {(state.travels ?? []).length > 0 && (
              <p className="text-natalis-muted text-xs px-1 pb-1">Been: {[...new Set((state.travels ?? []).map(t => t.name))].slice(-3).join(', ')}</p>
            )}
            {regions.map(region => {
              const dests = trips.filter(d => d.region === region.key)
              if (dests.length === 0) return null
              return (
                <div key={region.key}>
                  <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1 py-1">{region.label}</p>
                  {dests.map(dest => {
                    const timesVisited = visited.filter(id => id === dest.id).length
                    return (
                      <Btn
                        key={dest.id}
                        disabled={noActions || (state.money ?? 0) < dest.price}
                        onClick={() => { bookTrip(dest.id); onClose() }}
                        title={`${dest.name}${timesVisited > 0 ? `, again` : ''}`}
                        cost={money$(dest.price)}
                      />
                    )
                  })}
                </div>
              )
            })}
            {state.age >= 18 && (
              <>
                <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1 pt-3 pb-1">To live somewhere else</p>
                {closed ? (
                  <p className="text-natalis-muted text-sm px-1 py-1 leading-relaxed">{closed}</p>
                ) : (
                  <>
                    <p className="text-natalis-muted text-xs px-1 pb-1">A move takes the rest of the year.</p>
                    {options.map(o => (
                      <Btn
                        key={o.name}
                        disabled={noActions}
                        onClick={() => { doEmigrate(o.name); onClose() }}
                        title={o.display.replace(/^the /, 'The ')}
                        subtitle={o.note}
                        cost={`${money$(o.cost)}, ${o.how}${(state.money ?? 0) < o.cost ? ' — borrowed' : ''}`}
                      />
                    ))}
                  </>
                )}
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
          const perfColor = perf > 65 ? '#3f6146' : perf > 35 ? '#8a6635' : '#8c3a2e'
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
              <Btn disabled={noActions} onClick={() => go(hireEmployee)} title="Hire Employee" subtitle="Add staff to boost performance." cost={`~${money$(hiringCostOf(state))}`} />
              <Btn onClick={() => { closeBusiness(); onClose() }} title="Close Business" subtitle="Wind down and take salvage value." danger />
            </>
          )
        }
        const available = getAvailableBusinessTypes(state)
        return (
          <>
            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Something of your own</p>
            {available.map(bt => (
              <Btn key={bt.id}
                disabled={noActions || (state.money ?? 0) < bt.cost}
                onClick={() => { startBusiness(bt.id); onClose() }}
                title={bt.name}
                subtitle={bt.description}
                cost={`${money$(bt.cost)} to open`}
              />
            ))}
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
          citizen: '#3f6146', permanent_resident: '#3f6146', work_visa: '#8a6635',
          undocumented: '#8c3a2e', refugee_status: '#8a6635', asylum_seeker: '#8a6635',
          tourist_overstay: '#8c3a2e',
        }

        return (
          <>
            <div className="bg-white rounded-xl border border-natalis-border p-4 mb-2 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-natalis-muted font-semibold uppercase tracking-wider">Current Status</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: RS_COLORS[rs] ?? '#7d766a', backgroundColor: `${RS_COLORS[rs] ?? '#7d766a'}18` }}>
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
                  disabled={noActions || yearsAbroad < path.yearsReq || (state.money ?? 0) < eraMoney(path.fee, state)}
                  onClick={() => { doUpgradeResidency(); onClose() }}
                  title={`Apply for ${path.next}`}
                  subtitle={
                    yearsAbroad < path.yearsReq
                      ? `Requires ${path.yearsReq - yearsAbroad} more year${path.yearsReq - yearsAbroad !== 1 ? 's' : ''} of residency`
                      : path.fee > 0 ? `Application fee: $${eraMoney(path.fee, state).toLocaleString()}` : 'No fee'
                  }
                  cost={path.fee > 0 ? `$${eraMoney(path.fee, state).toLocaleString()}` : 'Free'}
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
                title="Try to get out"
                subtitle="If it fails, three more years. If it works, you are running for the rest of it."
              />
            </>
          )
        }

        // On the run options
        // Both were priced at the BIRTH country's wage scale and the smuggler's
        // range was printed in present-day dollars while the store charged
        // era money. One figure each, the one the store charges.
        const identityCost = forgedPapersCost(state)
        const smugglerMin = smugglerFee(state)

        return (
          <>
            <div className="bg-red-50 rounded-xl border border-red-200 p-3 mb-2">
              <p className="text-red-700 text-xs font-semibold">They are looking for you</p>
              <p className="text-red-500 text-xs mt-0.5">Every year the search goes on, it gets a little closer.</p>
            </div>

            {!state.flags.includes('assumed_identity') && (
              <Btn disabled={noActions || (state.money ?? 0) < identityCost}
                onClick={() => { assumeIdentity(); onClose() }}
                title="Become somebody else"
                subtitle="Papers with another name on them, good enough for most counters."
                cost={money$(identityCost)}
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
                title="Change your face"
                subtitle="Hair, weight, the way you walk. Surgery, if it is to be had."
              />
            )}

            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2 pb-1">Flee the Country Illegally</p>
            <p className="text-natalis-muted text-xs px-1 mb-2">A smuggler wants {money$(smugglerMin)}. About one crossing in three is stopped.</p>
            {destinationsFor(state).map(name => (
              <Btn key={name} danger
                disabled={noActions || (state.money ?? 0) < smugglerMin}
                onClick={() => { goIllegal(name); onClose() }}
                title={name}
                subtitle="Across the border at night, with papers that are not yours."
              />
            ))}
          </>
        )
      }

      case 'prison': {
        if (!state.inPrison) return <p className="text-natalis-muted text-sm italic p-3">You are not in prison.</p>
        const bribeMin = estimateCost(state, 500)
        return (
          <>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 mb-3">
              <p className="text-white text-xs font-semibold">Inside</p>
              <p className="text-gray-300 text-xs mt-0.5">Sentence remaining: <span className="text-white font-bold">{state.prisonSentence} year{state.prisonSentence !== 1 ? 's' : ''}</span></p>
            </div>

            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 py-1">Daily Life</p>

            <Btn disabled={noActions}
              onClick={() => { doPrisonWork(); onClose() }}
              title="Work detail"
              subtitle="The laundry, the kitchen, the yard. A little money for the commissary."
            />

            <Btn disabled={noActions}
              onClick={() => { doPrisonCry(); onClose() }}
              title="Let it out"
              subtitle="In the cell, when it is as quiet as it gets."
            />

            <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-3 py-1">High-Risk Actions</p>

            <Btn disabled={noActions || (state.money ?? 0) < bribeMin} danger
              onClick={() => { doPrisonBribeGuard(); onClose() }}
              title="Pay a guard"
              subtitle={`Half the time a year goes missing from the paperwork. Sometimes the guard reports you. ${localRange(500, 3000)}.`}
            />

            <Btn disabled={noActions} danger
              onClick={() => { doPrisonStartRiot(); onClose() }}
              title="Start something on the wing"
              subtitle="It might cost the paperwork a year. It might cost you more."
            />

            {livePartner && (
              <>
                <p className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-3 py-1">Relationships</p>
                <Btn disabled={noActions}
                  onClick={() => { doPrisonConjugalVisit(); onClose() }}
                  title={`A visit from ${livePartner.name.split(' ')[0]}`}
                  subtitle="If they come."
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
              title="Try to get out"
              subtitle="If it fails, three more years. If it works, you are running for the rest of it."
            />
          </>
        )
      }

      default:
        return <p className="text-natalis-muted text-sm italic p-3">Select a category.</p>
    }
  }

  // ── Main render ───────────────────────────────────────────────────────────────

  // One predicate, used both to render the list and to decide whether there is
  // a list at all. It was duplicated, and the copy drifted on six age floors
  // within minutes of being written: the groups each return null when empty,
  // so without an accurate answer here the sheet opens onto an 87-pixel header
  // bar over nothing, which reads as a broken panel rather than as "there is
  // nothing a one-year-old can choose to do".
  const isUnderground = state.inPrison || state.wanted || state.flags.includes('escaped_prisoner')
  const prisonBlockedCats = ['love', 'fertility', 'nightlife', 'movies', 'salon', 'shopping', 'social_media', 'plastic_surg', 'race_tracks', 'rehab', 'licenses', 'assets', 'crime', 'travel', 'business', 'career', 'underground', 'immigration']
  const MIN_AGE = {
    mind_body: 6, hobbies: 5, education: 8, movies: 5, salon: 12, friends: 5,
    nightlife: 18, fertility: 14, plastic_surg: 18, licenses: 16, race_tracks: 18,
    pets: 8, career: 14, assets: 18, money: 14, substances: 14, crime: 12,
    travel: 16, business: 18, love: 12, social_media: 10, shopping: 10,
  }
  // Posting content for followers is a verb of the late 2000s. It was offered
  // to a 1955 teenager with a comedy niche and a follower count.
  const liveC = state.currentCountry ?? state.character?.country
  const socialMediaExists = (state.currentYear ?? 0) >= 2006 &&
    (hasTech(liveC, 'home_internet', state.currentYear) || hasTech(liveC, 'smartphone', state.currentYear))
  // A category is shown when something in it exists for this person here and
  // now. "Business: No business types available yet." and a race card in a
  // village with no racecourse were both categories that opened onto nothing
  // the character could have done.
  const OFFERS = {
    salon: () => salonOptions(state).length > 0,
    shopping: () => shoppingOptions(state).length > 0,
    plastic_surg: () => surgeryOptions(state).length > 0,
    hobbies: () => (ACTIVITIES.hobbies ?? []).some(a => activityOffered(state, a.id)),
    movies: () => cinemaAvailable(state),
    nightlife: () => goingOutAvailable(state) || ['volunteer', 'join_club'].some(id => activityOffered(state, id)),
    pets: () => petOptions(state).length > 0,
    business: () => !!state.business?.active || getAvailableBusinessTypes(state).length > 0,
    assets: () => propertyOptions(state).length > 0 || vehicleOptions(state).length > 0 || (state.assets?.properties?.length ?? 0) > 0 || (state.assets?.vehicles?.length ?? 0) > 0,
    licenses: () => licenceOptions(state).length > 0,
    travel: () => tripOptions(state).length > 0 || state.age >= 18,
    race_tracks: () => racecourseOpen(state),
    substances: () => substanceOptions(state).length > 0,
    rehab: () => (hasAddiction && rehabExists(state)) || ['quit_smoking', 'rehab'].some(id => activityOffered(state, id)),
  }
  const isCategoryVisible = (cat) => {
    if (MIN_AGE[cat.key] !== undefined && state.age < MIN_AGE[cat.key]) return false
    if (cat.key === 'social_media' && !socialMediaExists) return false
    if (cat.key === 'crime' && state.pendingTrial) return false
    if (cat.key === 'immigration' && state.residencyStatus === 'citizen' && !state.flags.includes('emigrated')) return false
    if (cat.key === 'underground' && !isUnderground) return false
    if (cat.key === 'prison' && !state.inPrison) return false
    if (state.inPrison && prisonBlockedCats.includes(cat.key)) return false
    if (OFFERS[cat.key] && !OFFERS[cat.key]()) return false
    return true
  }
  const anyCategoryVisible = TOP_CATEGORIES.some(isCategoryVisible)

  return (
    <div className="bg-natalis-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-natalis-border bg-white">
        <div className="flex items-center gap-2">
          {activeTop && (
            <button onClick={() => setActiveTop(null)} className="text-bit-blue font-semibold text-sm mr-1">← Back</button>
          )}
          <p className="font-bold text-natalis-text text-sm">
            {activeTop ? TOP_CATEGORIES.find(c => c.key === activeTop)?.label : 'Activities'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {Array.from({ length: state.maxActionsPerYear }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: i < state.actionsThisYear ? '#e2ddd2' : '#3f5670' }} />
            ))}
          </div>
          <button onClick={onClose} className="text-natalis-muted text-lg leading-none">✕</button>
        </div>
      </div>

      {/* The year's budget, said once, quietly. The dots alone never explained
          what they were counting. */}
      {!activeTop && state.age >= 5 && !state.dead && (
        <p className="px-4 pt-2 text-natalis-muted text-xs leading-relaxed">
          {actionsLeft >= 2 ? 'A year has room for two things you choose to do. The rest of it happens to you.'
            : actionsLeft === 1 ? 'There is room for one more thing this year.'
              : 'This year\'s choices are made. The rest of it happens to you.'}
        </p>
      )}

      {/* Content */}
      <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
        {!activeTop ? (
          /* Top-level category list — grouped */
          <div className="p-3 space-y-4">
            {anyCategoryVisible || (
              <p className="text-natalis-muted text-sm px-3 py-8 text-center leading-relaxed">
                {state.age < 5
                  ? 'Nothing here yet. At this age the year happens to you.'
                  : 'Nothing available to you right now.'}
              </p>
            )}
            {CATEGORY_GROUP_ORDER.map(groupLabel => {
              const visibleCats = TOP_CATEGORIES.filter(c => c.group === groupLabel).filter(isCategoryVisible)

              if (visibleCats.length === 0) return null

              return (
                <div key={groupLabel}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-natalis-muted px-1 pb-1">{groupLabel}</p>
                  <div className="space-y-1.5">
                    {visibleCats.map(cat => {
                      const badge = cat.key === 'prison' && state.inPrison ? { text: `${state.prisonSentence}yr`, color: '#8c3a2e' } :
                                    cat.key === 'underground' && isUnderground ? { text: '!', color: '#8c3a2e' } :
                                    cat.key === 'rehab' && hasAddiction ? { text: '!', color: '#8c3a2e' } :
                                    cat.key === 'mind_body' && anySevereUnmanaged ? { text: '⚕', color: '#8a6635' } :
                                    cat.key === 'love' && pendingPartner && !livePartner ? { text: '1', color: '#7b4356' } :
                                    cat.key === 'social_media' && sm.followers > 0 ? { text: sm.followers >= 1000 ? `${(sm.followers/1000).toFixed(0)}k` : sm.followers.toString(), color: '#3f5670' } :
                                    cat.key === 'friends' && (state.friends ?? []).filter(f => f.alive).length > 0 ? { text: (state.friends ?? []).filter(f => f.alive).length.toString(), color: '#3f6146' } :
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
                </div>
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

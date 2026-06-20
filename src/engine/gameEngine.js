/**
 * gameEngine.js — re-exporter
 *
 * The original monolith has been split into focused modules:
 *   character.js   — character creation + utility functions
 *   yearTexture.js — buildYearTexture (~12k lines)
 *   tick.js        — buildG, buildEffectProxy, tick, helpers, career functions
 *   playerActions.js — career/partner/property/prison/stocks functions
 *   epitaph.js     — generateIdentityCard, generateEpitaph, generateLifeNotes
 *
 * This file re-exports everything so existing consumers need no changes.
 */

// ── character.js ──────────────────────────────────────────────────────────────
export {
  FlagSet,
  getPhase,
  getCountryRegime,
  isLgbtqCriminalized,
  createCharacter,
  deriveInitialStats,
  deriveInitialMoney,
  deriveInitialParents,
  deriveInitialSiblings,
  deriveBirthText,
  deriveInitialGold,
  initializeBanked,
  initializeJointFamily,
  deriveGenerationalFlags,
  calculateHouseholdContribution,
  getFinancialReputationDisplay,
  getWealthTierLabel,
  formatParentIncome,
  GDP_MULT,
  WEALTH_TIER_LABEL_MAP,
  HYPERINFLATION_PERIODS,
  HYPERINFLATION_DRAIN,
  getHyperinflation,
  tickFamilyIncome,
  ADULT_TRAITS,
  TRAIT_PROSE,
  CHILD_TRAITS,
  pickTraits,
  DESIRE_LABELS,
  PARTNER_OCCUPATIONS,
  BUSINESS_TYPES,
  weightedRandom,
  weightedRandomFromArray,
  getLifeSkeletonMap,
  getPhaseEntryMap,
} from './character'

// ── tick.js ───────────────────────────────────────────────────────────────────
export {
  getNextEvent,
  buildG,
  buildEffectProxy,
  applyProxy,
  resolveProxyExtras,
  getAvailableCareers,
  enterCareer,
  checkPromotion,
  askForRaise,
  quitJob,
  attemptCrime,
  tick,
  resolveChoice,
} from './tick'

// ── playerActions.js ──────────────────────────────────────────────────────────
export {
  generatePartnerProfile,
  meetPotentialPartner,
  hookUp,
  goOnDate,
  complimentPartner,
  proposeMarriage,
  getMarried,
  fileForDivorce,
  tryForChild,
  spendTimeWithChild,
  callParent,
  callSibling,
  adoptChild,
  getPlasticSurgery,
  applyActivity,
  buyProperty,
  sellProperty,
  buyVehicle,
  sellVehicle,
  abandonChild,
  adoptPet,
  visitVet,
  workHarder,
  schmoozeBoss,
  retire,
  relocate,
  emigrate,
  upgradeResidency,
  seekAsylum,
  studyHarder,
  goToMovies,
  goClubbing,
  goShopping,
  visitSalonSpa,
  postSocialMedia,
  promoteSocialMedia,
  betOnHorses,
  goToRehab,
  toggleBirthControl,
  useSubstance,
  practiceMartalArts,
  obtainLicense,
  interactWithFriend,
  dropOutOfSchool,
  bookTrip,
  getAvailableBusinessTypes,
  startBusiness,
  manageBusiness,
  hireEmployee,
  closeBusiness,
  prisonWork,
  prisonCry,
  prisonConjugalVisit,
  prisonBribeGuard,
  prisonStartRiot,
} from './playerActions'

// ── epitaph.js ────────────────────────────────────────────────────────────────
export {
  generateIdentityCard,
  generateEpitaph,
  generateLifeNotes,
} from './epitaph'

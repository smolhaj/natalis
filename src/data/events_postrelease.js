// BUILD 48 — Post-Release: The Criminal Record as a Permanent Condition
// All events gate on G.flags.has('served_prison_time') or G.criminalRecord.length > 0.
// Crime category (violent/drug/property/financial/white_collar/petty) is now stored
// on each criminalRecord entry: { crime, age, category }.
// Mandatory archetype/country branching: USA + violent != Switzerland + financial.

const hasCategory = (criminalRecord, cat) =>
  (criminalRecord ?? []).some(r => (r?.category ?? 'other') === cat)

const getRecordCategory = (criminalRecord) => {
  const r = criminalRecord ?? []
  if (r.some(e => (e?.category ?? '') === 'violent')) return 'violent'
  if (r.some(e => (e?.category ?? '') === 'drug')) return 'drug'
  if (r.some(e => ['financial', 'white_collar'].includes(e?.category ?? ''))) return 'financial'
  return 'other'
}

export const POSTRELEASE_EVENTS = [

  // ── THE RELEASE ────────────────────────────────────────────────────────────

  {
    id: 'pr_release_morning',
    phase: null,
    weight: 10,
    cooldown: 0,
    when: (G) =>
      G.flags.has('served_prison_time') &&
      !G.inPrison &&
      !G.mem?.prReleaseDone &&
      G.age <= 45,
    text: (G) => {
      const isPolitical = G.flags.has('political_prisoner') || G.flags.has('dissident_writer')
      if (isPolitical) {
        return 'You walk through the gate carrying what you came in with — not much — and what you accumulated inside, which is harder to name. People who were arrested for what they said or wrote carry something that people arrested for what they did sometimes do not: the conviction that the wrong person served the sentence.'
      }
      return 'The gate opens and the light is the same light as always but too much of it. You have a bag with your things, a small amount of cash they return, and an address. The first bus you board, you sit near the door without meaning to. It takes three weeks to stop doing that.'
    },
    choices: [
      {
        text: 'Go to family — whoever is still there',
        tag: null,
        outcome: 'Some of them waited. That matters more than you can say directly.',
        effect: (p) => { p.setMem('prReleaseDone', true); p.m += 8; p.addFlag('family_after_prison') },
      },
      {
        text: 'Find a room — start clean, without explanations',
        tag: null,
        outcome: 'The room is small. You are alone with what you know about yourself now.',
        effect: (p) => { p.setMem('prReleaseDone', true); p.m -= 3; p.e += 4; p.mo -= 400 },
      },
    ],
    effect: null,
  },

  // ── JOB APPLICATION ────────────────────────────────────────────────────────

  {
    id: 'pr_job_application',
    phase: 'young_adult',
    weight: 4,
    cooldown: 3,
    when: (G) =>
      G.criminalRecord.length > 0 &&
      !G.inPrison &&
      G.age >= 19 && G.age <= 45 &&
      G.career === null,
    text: (G) => {
      const country = G.currentCountry?.name ?? ''
      const category = getRecordCategory(G.criminalRecord)
      if (country === 'United States' || country === 'USA') {
        return 'The application form is standard until the bottom of the second page. *Have you ever been convicted of a felony?* The checkbox is a small square. The job is at a warehouse. You know that checking the box means the application goes into a different pile, and that pile has a low probability of becoming an interview.'
      }
      if (category === 'financial' || category === 'white_collar') {
        return 'The position is entry-level. The company does background checks on everyone. You disclosed the conviction in your cover letter — the advice was to get ahead of it. You wait to find out whether the honesty costs you the interview.'
      }
      return 'The job pays enough to live on. The application asks about criminal history. You sit with the form for longer than the form expects.'
    },
    choices: [
      {
        text: 'Disclose honestly and argue your case',
        tag: null,
        outcome: (G) => {
          const country = G.currentCountry?.name ?? ''
          if (country === 'United States') return 'Three employers pass. The fourth calls anyway. The job is not what you wanted but it is a job.'
          return 'They appreciate the transparency. Not all of them do, but this one does.'
        },
        effect: (p) => { p.setMem('prJobApplicationHonest', true); p.m -= 5; p.karma += 5; p.mo += 1200 },
      },
      {
        text: (G) => G.stats?.smarts > 55 ? 'Omit it — it wasn\'t a felony' : 'Leave the box unchecked',
        tag: null,
        outcome: 'The risk travels with you. If the background check goes deep enough, you will need an explanation you haven\'t written yet.',
        effect: (p) => { p.setMem('prJobApplicationLied', true); p.mo += 1200; p.m -= 3; p.karma -= 5 },
      },
      {
        text: 'Don\'t apply for jobs that ask this question',
        tag: null,
        outcome: 'You find work in the informal economy, or with an employer who doesn\'t check. The money is lower. The paperwork is less.',
        effect: (p) => { p.setWorkStatus('informal'); p.mo += 700; p.m -= 5 },
      },
    ],
    effect: null,
  },

  {
    id: 'pr_application_lie_discovered',
    phase: 'young_adult',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.mem?.prJobApplicationLied &&
      !G.mem?.prLieDiscovered &&
      G.career !== null,
    text: 'Your manager calls you into a side room. The background check that the company said it had already done — they run a secondary one for internal promotion. Your record came back. The question now is whether disclosing is less costly than being discovered to have concealed.',
    choices: [
      {
        text: 'Come clean before they say anything more',
        tag: null,
        outcome: 'You lose the promotion. You keep the job — barely, and on different terms now.',
        effect: (p) => { p.setMem('prLieDiscovered', true); p.m -= 12; p.karma += 3; p.w -= 5 },
      },
      {
        text: 'Deny — there must be an error in their records',
        tag: null,
        outcome: 'They dismiss you the following Friday. The HR letter says "circumstances of discovery of misrepresentation."',
        effect: (p) => { p.setMem('prLieDiscovered', true); p.m -= 20; p.karma -= 8; p.mo -= 2000; p.clearCareer() },
      },
    ],
    effect: null,
  },

  // ── HOUSING ────────────────────────────────────────────────────────────────

  {
    id: 'pr_housing_difficulty',
    phase: 'young_adult',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.flags.has('served_prison_time') &&
      !G.mem?.prHousingDone &&
      G.money < 3000 &&
      !G.inPrison,
    text: (G) => {
      const country = G.currentCountry?.name ?? ''
      if (country === 'United States') {
        return 'Public housing applications ask about felony convictions. Section 8 vouchers have restrictions. The private landlords do credit and background checks. The shelter has a waiting list. The address you need to apply for most things is the address you cannot get without the other things.'
      }
      return 'The landlord runs a check. The result comes back and he calls to say the room has been taken. It was not taken. You know what "the room has been taken" means and he knows you know.'
    },
    choices: [
      {
        text: 'Stay with family or someone who will take you in',
        tag: null,
        outcome: 'You sleep on a sofa for three months. It is not sustainable. It is also not the street.',
        effect: (p) => { p.setMem('prHousingDone', true); p.m -= 8; p.addFlag('housing_precarious') },
      },
      {
        text: 'Pay cash upfront to a landlord who doesn\'t ask questions',
        tag: null,
        outcome: 'No lease, no questions. The room is worse than what you could afford legally. You take it.',
        effect: (p) => { p.setMem('prHousingDone', true); p.mo -= 1200; p.m -= 5 },
      },
    ],
    effect: null,
  },

  // ── PAROLE ─────────────────────────────────────────────────────────────────

  {
    id: 'pr_parole_conditions',
    phase: 'young_adult',
    weight: 4,
    cooldown: 2,
    when: (G) =>
      G.flags.has('served_prison_time') &&
      !G.inPrison &&
      G.mem?.originalSentence >= 3 &&
      !G.mem?.paroleConditionsDone,
    text: 'Parole means freedom with an asterisk. You report weekly. You do not leave the county without approval. You do not associate with known felons, which would include most of the people you knew before. Each condition is a mechanism by which the sentence continues after the sentence ends.',
    choices: [
      {
        text: 'Meet every condition, no exceptions',
        tag: null,
        outcome: 'You do what is required. The parole officer notes your compliance. The paperwork is manageable, which is not the same as fair.',
        effect: (p) => { p.setMem('paroleConditionsDone', true); p.m -= 5; p.karma += 5; p.addFlag('parole_compliant') },
      },
      {
        text: 'Navigate it — some conditions are harder to meet',
        tag: null,
        outcome: 'You are technically in violation of one condition by the third week. The officer looks the other way. This time.',
        effect: (p) => { p.setMem('paroleConditionsDone', true); p.m -= 8; p.karma -= 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'pr_parole_near_breach',
    phase: 'young_adult',
    weight: 3,
    cooldown: 3,
    when: (G) =>
      G.flags.has('served_prison_time') &&
      !G.inPrison &&
      G.mem?.originalSentence >= 3,
    text: (G) => {
      const hasParent = G.parents && (G.parents.mother?.alive || G.parents.father?.alive)
      if (hasParent) return 'Your mother is in hospital two counties over. Getting there without prior approval from the parole officer is a technical breach. Calling the office takes three days to clear. She may not have three days.'
      return 'A shift change means you missed your weekly check-in by eighteen hours. You call immediately. You explain. You wait to find out whether explanation is enough.'
    },
    choices: [
      {
        text: 'Call the office first — wait for the answer',
        tag: null,
        outcome: 'They approve it. The process is dehumanising and the outcome is correct.',
        effect: (p) => { p.m -= 8; p.karma += 2 },
      },
      {
        text: 'Go — face the consequences afterward',
        tag: null,
        outcome: 'The officer hears the explanation. He files a report. He does not recommend revocation. You are grateful in a way that costs you something.',
        effect: (p) => { p.m -= 10; p.karma += 5; p.addFlag('parole_breach_forgiven') },
      },
    ],
    effect: null,
  },

  // ── FAMILY ─────────────────────────────────────────────────────────────────

  {
    id: 'pr_family_reunion',
    phase: 'young_adult',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.flags.has('served_prison_time') &&
      !G.mem?.prFamilyReunion &&
      !G.inPrison,
    text: (G) => {
      const hasFamily = G.parents?.mother?.alive || G.parents?.father?.alive || G.siblings.length > 0
      if (!hasFamily) return 'The people who were there are not all still there. Some moved. Some stopped writing. The absence has a specific shape: not a loss but a subtraction that happened slowly enough that it isn\'t called grief.'
      return 'You sit at the same table you have sat at your whole life. The people across it are the same people. The person sitting in your chair is different, though, and everyone pretends they cannot see it. This is mercy and avoidance simultaneously.'
    },
    choices: [
      {
        text: 'Say what happened — give them something real',
        tag: null,
        outcome: 'Not everything. Enough. They listen in the way families listen: imperfectly and completely.',
        effect: (p) => { p.setMem('prFamilyReunion', true); p.m += 8; p.s += 4; p.karma += 3 },
      },
      {
        text: 'Keep it on the surface — be present without being open',
        tag: null,
        outcome: 'The dinner is fine. Fine is not nothing.',
        effect: (p) => { p.setMem('prFamilyReunion', true); p.m += 2 },
      },
    ],
    effect: null,
  },

  // ── STRUCTURAL TRAP ────────────────────────────────────────────────────────

  {
    id: 'pr_recidivism_trap',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.has('served_prison_time') &&
      !G.mem?.prTrapEvent &&
      G.money < 1500 &&
      G.career === null &&
      !G.inPrison &&
      (G.flags.has('housing_precarious') || G.mem?.prHousingDone),
    text: (G) => {
      const category = getRecordCategory(G.criminalRecord)
      if (G.currentCountry?.name === 'United States' && category === 'drug') {
        return 'No housing because of the record. No job because of no fixed address. Drug treatment is conditional on stable housing. Stable housing is conditional on income. Income is conditional on employment. Employment is conditional on the record. The record is permanent. You are not stupid. You can see exactly what this is.'
      }
      return 'The arithmetic does not work. The legal options require resources you do not have. The illegal options are available. You are not back where you started. You are in a place that was built to put you back.'
    },
    choices: [
      {
        text: 'Find support — NGO, probation officer, anyone',
        tag: null,
        outcome: 'There is a programme. It has a waiting list. You get on the waiting list.',
        effect: (p) => { p.setMem('prTrapEvent', true); p.m -= 10; p.karma += 5; p.addFlag('seeking_reentry_support') },
      },
      {
        text: 'Go back to what you know',
        tag: null,
        outcome: 'The decision is not a moral failure. It is a response to a structure. That does not make the consequences less real.',
        effect: (p) => { p.setMem('prTrapEvent', true); p.karma -= 8; p.addFlag('recidivism_risk') },
      },
    ],
    effect: null,
  },

  // ── USA-SPECIFIC COLLATERAL ────────────────────────────────────────────────

  {
    id: 'pr_usa_rights_lost',
    phase: 'young_adult',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.currentCountry?.name === 'United States' &&
      G.criminalRecord.length > 0 &&
      !G.mem?.prUsaRightsLost &&
      !G.inPrison,
    text: 'You discover, by accident rather than through any official notification, the precise list of what a conviction removes: the right to vote, in this state, for felons on parole. Access to federal student loans. Eligibility for public housing programmes. The right to sit on a jury. The right to hold certain professional licences. The conviction was for a finite term. The consequences are not.',
    choices: [
      {
        text: 'Find a legal aid organisation to understand your rights',
        tag: null,
        outcome: 'In two states you discover voting rights are restored automatically after parole. This matters more than you expected it to.',
        effect: (p) => { p.setMem('prUsaRightsLost', true); p.m -= 5; p.e += 5; p.karma += 3; p.addFlag('knows_rights') },
      },
      {
        text: 'Accept the situation as the cost of what happened',
        tag: null,
        outcome: 'A particular kind of resignation: not peace, but the absence of active struggle against what cannot be changed today.',
        effect: (p) => { p.setMem('prUsaRightsLost', true); p.m -= 8; p.r += 5 },
      },
    ],
    effect: null,
  },

  // ── UK SPENT CONVICTION ────────────────────────────────────────────────────

  {
    id: 'pr_spent_conviction',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) => {
      const country = G.currentCountry?.name ?? ''
      const isUK = country === 'United Kingdom' || country === 'UK'
      const isEU = ['Germany', 'France', 'Netherlands', 'Sweden', 'Norway', 'Denmark'].includes(country)
      if (!isUK && !isEU) return false
      const hasMinor = (G.criminalRecord ?? []).some(r => {
        const cat = r?.category ?? 'other'
        return ['petty', 'property', 'drug'].includes(cat)
      })
      return hasMinor && G.age >= 30 && !G.mem?.prSpentConviction
    },
    text: (G) => {
      const country = G.currentCountry?.name ?? ''
      const years = country === 'United Kingdom' ? 'five' : 'several'
      return `After ${years} clean years, the conviction is spent under the Rehabilitation of Offenders Act. You do not need to declare it to most employers anymore. The record exists — it always will — but the law acknowledges that a person at ${G.age} is not the same person who was convicted at ${(G.criminalRecord?.[0]?.age ?? G.age - 10)}.`
    },
    choices: null,
    effect: (p) => {
      p.setMem('prSpentConviction', true)
      p.m += 12; p.w += 5
      p.addFlag('conviction_spent')
    },
  },

  // ── DECADE CLEAN ───────────────────────────────────────────────────────────

  {
    id: 'pr_decade_clean',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.has('served_prison_time') &&
      !G.mem?.prDecadeClean &&
      !G.inPrison &&
      G.age >= 32,
    text: (G) => {
      const category = getRecordCategory(G.criminalRecord)
      const infoLine = category === 'violent'
        ? 'The form still asks. The answer does not change.'
        : category === 'drug'
        ? 'Some states are changing their approach. Most employers are not.'
        : 'The record surfaces when you least expect it.'
      return `A decade out. Not ten years clean — the record doesn\'t have a clean version, only a longer one. ${infoLine} You have built something in this time: a life that has a shape to it, even if that shape required building around a fact you cannot remove.`
    },
    choices: null,
    effect: (p) => {
      p.setMem('prDecadeClean', true)
      p.m += 10; p.karma += 5
      p.addFlag('decade_after_prison')
    },
  },

  // ── POLITICAL PRISONER TRACK ───────────────────────────────────────────────

  {
    id: 'pr_political_release',
    phase: 'young_adult',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.flags.has('served_prison_time') &&
      (G.flags.has('political_prisoner') || G.flags.has('dissident_writer') || G.flags.has('dissident_reader')) &&
      !G.mem?.prPoliticalReleaseDone &&
      !G.inPrison,
    text: (G) => {
      const regime = G.regime ?? 'authoritarian'
      const isPost = ['democracy', 'parliamentary_republic', 'federal_republic'].includes(regime)
      if (isPost) return 'The new government released political prisoners as one of its first acts. You walk out into a city that is the same city but is naming things differently now. People on the street recognise you in some cases. You are not sure what to do with recognition after years of invisibility enforced by law.'
      return 'The release comes without explanation, which is how these things work. One day the door opens. No apology, no acknowledgment. You are supposed to understand that continuing in silence is the price of continuing outside.'
    },
    choices: [
      {
        text: 'Speak publicly — bear witness to what happened',
        tag: null,
        outcome: 'You give interviews. Your name attaches to the story. The risk is not zero.',
        effect: (p) => { p.setMem('prPoliticalReleaseDone', true); p.m -= 5; p.karma += 15; p.s += 5; p.addFlag('political_witness') },
      },
      {
        text: 'Return to private life — let the silence continue',
        tag: null,
        outcome: 'A defensible choice. The silence is yours now, at least — not imposed.',
        effect: (p) => { p.setMem('prPoliticalReleaseDone', true); p.m += 5 },
      },
    ],
    effect: null,
  },

]

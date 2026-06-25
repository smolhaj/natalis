// events_condition_arc_2.js
// Depth extension for the chronic condition arc: condition-specific texture
// (Deaf culture, HIV pre-treatment era, insulin access, COPD oxygen, CGM shift),
// relational disclosure, workplace navigation, children's questions, late-life severity.
// Companion to events_condition_arc.js.

const CHRONIC_IDS = ['diabetes', 'heart_disease', 'copd', 'back_pain', 'hiv', 'blindness', 'deafness', 'chronic_depression', 'disability_injury']
const yrsWithCond = (c, G) => G.currentYear - (c.diagnosedYear ?? G.currentYear)

export const CONDITION_ARC_2_EVENTS = [

  // ── NEW PARTNER: DISCLOSURE ────────────────────────────────────────────────────

  {
    id: 'cond_new_partner_disclosure',
    phase: null,
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => CHRONIC_IDS.includes(c.id))
      return !!c && G.partner && G.age >= 18 && G.age <= 55 && !G.mem?.condPartnerDisclosure
    },
    text: (G) => {
      const c = G.conditions.find(c => CHRONIC_IDS.includes(c.id))
      const name = {
        diabetes: 'the diabetes', heart_disease: 'the heart condition', copd: 'the COPD',
        back_pain: 'the back', hiv: 'HIV', blindness: 'the vision', deafness: 'the deafness',
        chronic_depression: 'the depression', disability_injury: 'the injury',
      }[c?.id] ?? 'the condition'
      return `There is a point, early in something new, where the condition needs to be said. The question is when. You know how the information changes a room — the recalibration that happens in a face, the different quality of attention that follows. You have not been dishonest. You have been choosing the moment for ${name}.`
    },
    choices: [
      {
        text: 'Tell them now.',
        tag: null,
        outcome: 'They listen. There is a pause before they respond. What comes after the pause matters more than the pause itself.',
        effect: (p) => { p.m += 3; p.s += 2; p.updatePartnerRel(4); p.setMem('condPartnerDisclosure', true) },
      },
      {
        text: 'Not yet. Wait until you know what this is.',
        tag: null,
        outcome: 'You defer it. The window for natural disclosure will narrow the longer you wait. You know this.',
        effect: (p) => { p.r += 2; p.setMem('condPartnerDisclosure', true) },
      },
    ],
  },

  // ── HIV: THE PRE-TREATMENT YEARS ──────────────────────────────────────────────

  {
    id: 'cond_hiv_pre_treatment',
    phase: null,
    weight: 4,
    when: (G) => {
      const c = G.conditions.find(c => c.id === 'hiv')
      return !!c && G.currentYear >= 1981 && G.currentYear <= 1995 && G.age >= 16 && !G.mem?.condHivPreTreat
    },
    text: `The virus is new enough that the hospital does not know what to do except isolate. The ward is quiet in a specific way. The people who come to visit wear things over their hands and faces that were not required for other wards. The information available — in pamphlets, from doctors — is threaded through with uncertainty: not yet, not confirmed, not established. The epidemic is being learned about in real time. You are in it in real time. There is no treatment yet. There may be.`,
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 8; p.h -= 10; p.addFlag('hiv_disclosed'); p.setMem('condHivPreTreat', true) },
  },

  // ── DEAFNESS: FINDING THE COMMUNITY ──────────────────────────────────────────

  {
    id: 'cond_deafness_community',
    phase: null,
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => c.id === 'deafness' || c.id === 'born_deaf')
      const bornDeaf = G.flags.has('born_deaf')
      return (!!c || bornDeaf) && G.currentYear >= 1970 && G.age >= 14 && !G.mem?.condDeafCommunity
    },
    text: `You find the community the way you find a language you did not know you were missing. The gathering — a club, a school for the deaf, a network someone connects you to — has its own grammar: the way people make space to see each other's hands, the way the room adjusts to the visual rather than tolerating it. What the hearing world called a loss is not what people here call it. What they call it, and what you are beginning to call it, is a different thing entirely.`,
    choices: [
      {
        text: 'Enter this world. This is where you belong.',
        tag: 'deaf_community_identity',
        outcome: 'It becomes the community in which you are most fully yourself. Sign language deepens. The hearing world becomes something you navigate rather than inhabit.',
        effect: (p) => { p.m += 10; p.s += 5; p.addFlag('deaf_community_identity'); p.setMem('condDeafCommunity', true) },
      },
      {
        text: 'Connect with it, but keep a foot in the hearing world.',
        tag: null,
        outcome: 'You carry both. Neither fully claims you. This is its own kind of life.',
        effect: (p) => { p.m += 5; p.e += 2; p.setMem('condDeafCommunity', true) },
      },
    ],
  },

  // ── INSULIN ACCESS AND COST ───────────────────────────────────────────────────

  {
    id: 'cond_insulin_access',
    phase: null,
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => c.id === 'diabetes')
      if (!c) return false
      const lowMoney = G.money < 2000
      const developingWorld = ['developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone'].includes(G.character.country?.archetype)
      return (lowMoney || developingWorld) && G.age >= 18 && !G.mem?.condInsulinAccess
    },
    text: `The prescription runs out before the month does. Insulin is not optional — the body has no redundancy here, no alternative metabolism to fall back on. You are calculating between costs that are not comparable in any rational framework: what you can afford this week versus what the body will do without it. The calculation has a name in the places where it happens often enough to name: rationing. You are rationing insulin.`,
    choices: [
      {
        text: 'Find a way. Borrow, go without something else, ask family.',
        tag: null,
        outcome: 'You find the money. The cost of finding it is paid in other ways — relationships, time, the specific exhaustion of managing a disease in a system not built for you.',
        effect: (p) => { p.m -= 8; p.mo -= 400; p.h -= 2; p.setMem('condInsulinAccess', true) },
      },
      {
        text: 'Stretch the dose. Take less than prescribed.',
        tag: null,
        outcome: 'The body registers this. The numbers worsen over months in ways that are measurable and were predictable.',
        effect: (p) => { p.h -= 12; p.m -= 6; p.r += 4; p.setMem('condInsulinAccess', true) },
      },
    ],
  },

  // ── CONDITION AND WORK: DISCLOSURE DECISION ───────────────────────────────────

  {
    id: 'cond_work_disclosure',
    phase: null,
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => CHRONIC_IDS.includes(c.id))
      return !!c && G.career && G.age >= 22 && G.age <= 60 && !G.mem?.condWorkDisclosure
    },
    text: (G) => {
      const c = G.conditions.find(c => CHRONIC_IDS.includes(c.id))
      const name = {
        diabetes: 'the diabetes', heart_disease: 'the heart condition', copd: 'the COPD',
        back_pain: 'the back', hiv: 'HIV', blindness: 'the vision', deafness: 'the deafness',
        chronic_depression: 'the depression', disability_injury: 'the injury',
      }[c?.id] ?? 'the condition'
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is not visible to colleagues yet — or you have kept it that way. The question of disclosure at work is different from the question of disclosure in a relationship. Here there is a legal framework, a HR process, a range of possible accommodations. There is also the way people look at someone who has told them.`
    },
    choices: [
      {
        text: 'Disclose to HR. Request accommodations officially.',
        tag: null,
        outcome: 'HR acknowledges the disclosure. The accommodations are granted. Some colleagues notice the change; most say nothing. One person asks a careful question.',
        effect: (p) => { p.m += 4; p.setMem('condWorkDisclosure', true) },
      },
      {
        text: 'Manage it privately. Keep work separate from this.',
        tag: null,
        outcome: 'The management continues privately. It costs something — energy spent concealing, small adjustments made without explanation. The work gets done.',
        effect: (p) => { p.r += 3; p.m -= 2; p.setMem('condWorkDisclosure', true) },
      },
    ],
  },

  // ── COPD: THE OXYGEN CONCENTRATOR ─────────────────────────────────────────────

  {
    id: 'cond_copd_oxygen',
    phase: 'late_life',
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => c.id === 'copd' && yrsWithCond(c, G) >= 8)
      return !!c && G.age >= 60 && !G.mem?.condCopdOxygen
    },
    text: `The oxygen concentrator arrives and is installed in the corner of the room. It makes a sound — a mechanical rhythm, unremarkable after the first week. The air coming through the tube is richer than the ambient air and this difference is now part of how you breathe at rest. Leaving the house involves a portable cylinder that has a finite number of hours in it. You plan around the hours. The distance you can cover in a day is measured in a new unit.`,
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 5; p.h -= 5; p.setMem('condCopdOxygen', true) },
  },

  // ── DIABETES: THE CGM SHIFT ───────────────────────────────────────────────────

  {
    id: 'cond_diabetes_cgm',
    phase: null,
    weight: 2,
    when: (G) => {
      const c = G.conditions.find(c => c.id === 'diabetes' && c.managed)
      return !!c && G.currentYear >= 2005 && G.age >= 25 && !G.mem?.condDiabetesCGM &&
        ['wealthy_west', 'wealthy_east'].includes(G.character.country?.archetype)
    },
    text: `The continuous glucose monitor clips to the back of your arm and transmits to the phone in your pocket. You had been checking with a finger prick four, sometimes six times a day — the kit, the lancet, the small bright bead of blood, the number. The CGM gives you the number continuously and graphs it. You can see what food does and when. You can see the 3am dip before you wake with symptoms. Managing the condition changes when you can see it moving in real time rather than sampling it.`,
    choices: null,
    effect: (p) => { p.m += 6; p.h += 3; p.e += 2; p.setMem('condDiabetesCGM', true) },
  },

  // ── BLINDNESS: LEARNING THE CITY DIFFERENTLY ─────────────────────────────────

  {
    id: 'cond_blind_city',
    phase: null,
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => c.id === 'blindness')
      return !!c && G.ruralUrban === 'urban' && yrsWithCond(c, G) >= 1 && yrsWithCond(c, G) <= 7 && !G.mem?.condBlindCity
    },
    text: `You have mapped the route to the market in a different way than you used to. The count of steps from the building entrance to the corner. The sound the traffic makes at the intersection before the signal changes. The slight uphill gradient at the bakery that tells you you have gone one block too far. The city exists for people who can see it; what you have is a parallel city, assembled from texture and sound and air pressure and the knowledge of what is three steps to the left of what.`,
    choices: null,
    effect: (p) => { p.e += 3; p.r += 3; p.setMem('condBlindCity', true) },
  },

  // ── CHILDREN ASK ABOUT THE CONDITION ─────────────────────────────────────────

  {
    id: 'cond_children_ask',
    phase: null,
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => CHRONIC_IDS.includes(c.id))
      return !!c && G.children && G.children.length > 0 && G.age >= 28 && !G.mem?.condChildrenAsk
    },
    text: (G) => {
      const c = G.conditions.find(c => CHRONIC_IDS.includes(c.id))
      const child = G.children[0]
      const cname = {
        diabetes: 'the monitor and the insulin kit', heart_disease: 'the pills and the things you don\'t do',
        copd: 'why you breathe like that sometimes', back_pain: 'why you can\'t lift things',
        hiv: 'the medication', blindness: 'the cane', deafness: 'the hearing aids or the signing',
        chronic_depression: 'why sometimes you go quiet', disability_injury: 'the injury',
      }[c?.id] ?? 'this'
      return `${child?.name ?? 'Your child'} asks about ${cname}. The question is direct the way children's questions are direct — not cruel, just unencumbered by the tact adults develop around things they don't know how to ask about. You have been deciding what level of truth is appropriate for this age. You give the age-appropriate answer. It is also, roughly, the true one.`
    },
    choices: null,
    effect: (p) => { p.m += 3; p.e += 1; p.setMem('condChildrenAsk', true) },
  },

  // ── DEPRESSION: A LONG STRETCH OF STABILITY ────────────────────────────────────

  {
    id: 'cond_depression_stable_stretch',
    phase: null,
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => c.id === 'chronic_depression' && c.managed)
      return !!c && yrsWithCond(c, G) >= 7 && G.age >= 30 && !G.mem?.condDeprStable
    },
    text: `Seven years, longer, and the bad period is far enough behind to have a shape. Not gone — chronic means something specific — but managed well enough that you have had years that were simply years. Not years that were about managing it. This is what the psychiatrist called the goal, measured in years rather than appointments. You did not quite believe in it as a thing that could happen. It has happened. It is ongoing. You check in with it each morning the way you check a weather forecast: useful information, not always the main news of the day.`,
    choices: null,
    effect: (p) => { p.m += 8; p.e += 2; p.setMem('condDeprStable', true) },
  },

  // ── LATE LIFE: CONDITION BECOMES SEVERE ───────────────────────────────────────

  {
    id: 'cond_late_severity',
    phase: 'late_life',
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => c.managed && yrsWithCond(c, G) >= 12 && c.severity !== 'severe')
      return !!c && G.age >= 65 && !G.mem?.condLateSeverity
    },
    text: (G) => {
      const c = G.conditions.find(c => c.managed && yrsWithCond(c, G) >= 12 && c.severity !== 'severe')
      const name = {
        diabetes: 'the diabetes', heart_disease: 'the heart', copd: 'the COPD',
        back_pain: 'the back', hiv: 'HIV', blindness: 'the vision', deafness: 'the hearing',
        chronic_depression: 'the depression', disability_injury: 'the injury',
      }[c?.id] ?? 'the condition'
      return `${name.charAt(0).toUpperCase() + name.slice(1)} has been managed for over a decade, but age changes what managed means. The doctor explains the progression in terms that are careful and numerical. The condition is entering a stage where the treatment options shift and what was stable becomes a new negotiation. You are not surprised. You have known the condition long enough to know it has its own calendar, and you have arrived at the next page.`
    },
    choices: null,
    effect: (p) => { p.h -= 8; p.m -= 5; p.r += 4; p.setMem('condLateSeverity', true) },
  },

  // ── THE MEDICATION BECOMES ORDINARY ───────────────────────────────────────────

  {
    id: 'cond_medication_ordinary',
    phase: null,
    weight: 2,
    when: (G) => {
      const c = G.conditions.find(c => c.managed && yrsWithCond(c, G) >= 4)
      return !!c && G.age >= 25 && !G.mem?.condMedOrdinary
    },
    text: `The medication is in the cabinet where it always is. You take it the way you check your pockets before leaving — not a decision, not a gesture of maintenance, just a thing that happens at a certain time in the morning. You do not think about what the condition means every day anymore. The condition is a fact you accommodate the way you accommodate the shape of the flat or the commute's particular inconveniences: by not thinking about it, which is a form of having come to terms with it.`,
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('condMedOrdinary', true) },
  },

  // ── HIV DISCLOSURE: CARRYING VISIBILITY ──────────────────────────────────────

  {
    id: 'cond_hiv_visible_life',
    phase: null,
    weight: 2,
    when: (G) => G.flags.has('hiv_disclosed') && G.currentYear >= 1996 && G.age >= 25 && !G.mem?.condHivVisible,
    text: `You told someone, then others. The visibility has its own economy: the conversations it opens, the relief of not calculating what to hide, the occasional person who responds with a strangeness you had to factor in. The community around the disease has its own culture — built in the crisis years and still present, the particular solidarity of a group that knows what it lost and what it learned from losing it. You are part of that now. It is not what you would have chosen. It is what you have.`,
    choices: null,
    effect: (p) => { p.m += 5; p.s += 3; p.setMem('condHivVisible', true) },
  },

]

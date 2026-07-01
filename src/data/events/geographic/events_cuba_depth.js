// events_cuba_depth.js
// Cuba depth arc — texture not covered in events_cuba.js or events_latin_america.js.
// events_latin_america.js covers: CDR, Special Period, balsero 1994.
// events_cuba.js covers: revolution childhood, Bay of Pigs, Mariel, Santería,
// libreta, Raúl reforms, Obama thaw, July 11 2021.
// This file covers: Missile Crisis from inside, nueva trova movement, doctor
// export missions, Elián González 1999, dual-currency economy, education pride,
// exit visa system, Paragraph 69 persecution, gray period cultural censorship,
// Viñales tobacco farming.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const CUBA_DEPTH_EVENTS = [

  // ── CUBAN MISSILE CRISIS FROM INSIDE ─────────────────────────────────────

  {
    id: 'cub_dep_missile_crisis',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear === 1962 &&
      G.age >= 12 &&
      !G.mem?.cubDepMissile,
    text: 'October 1962. The crisis you hear about on the radio is described as a confrontation between Kennedy and Khrushchev. The crisis you are living is different in texture. The anti-aircraft batteries have been positioned on the outskirts of Havana. The militia units are on alert. Castro speaks for hours. The Soviet technicians are working at the installations in the countryside and you understand now what those installations are. The 13 days pass with a specific fear that is not entirely fear: there is also the revolutionary pride, the sense of being at the centre of history, the knowledge that Cuba has forced the two superpowers to negotiate over your island. When it is over and the missiles leave and the US promises not to invade, the specific emotional residue is complex: you were used as a pawn and you were also the reason it mattered.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.addFlag('cub_missile_crisis_generation')
      p.setMem('cubDepMissile', true)
    },
  },

  // ── NUEVA TROVA ───────────────────────────────────────────────────────────

  {
    id: 'cub_dep_nueva_trova',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1968 && G.currentYear <= 1985 &&
      G.age >= 15 &&
      !G.mem?.cubDepNuevaTrova,
    text: pick([
      'Silvio Rodríguez performs at the Casa de las Américas. The songs are not comfortable: they are critical, they are complex, they contain doubts that the official culture is not supposed to have. But they are also unmistakably revolutionary, unmistakably Cuban, and so they exist in a space where they are simultaneously celebrated and watched. You learn the words without necessarily understanding what exactly they are saying, and then one day you understand, and you understand that you have been singing the ambivalence for years without recognising it as ambivalence.',
      'Pablo Milanés is singing "Yolanda." Nueva trova is what the 1960s generation made out of the revolution and the guitar and the influences the Revolution cannot entirely exclude — North American folk, Brazilian bossa nova, Spanish poetry. The result is a Cuban music that is political and personal at the same time, that contains love songs which are also sometimes not love songs. You know which songs go on which occasions.',
    ]),
    choices: null,
    effect: (p) => {
      p.m += 4
      p.e += 3
      p.addFlag('cub_nueva_trova_generation')
      p.setMem('cubDepNuevaTrova', true)
    },
  },

  // ── DOCTOR EXPORT MISSION ─────────────────────────────────────────────────

  {
    id: 'cub_dep_doctor_mission',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1975 &&
      G.age >= 28 && G.age <= 55 &&
      G.career?.field === 'medical' &&
      !G.mem?.cubDepDoctorMission,
    text: (G) => {
      const destinations = ['Angola', 'Venezuela', 'Bolivia', 'Haiti', 'Ethiopia']
      const dest = destinations[Math.floor(Math.random() * destinations.length)]
      return `The internationalist mission: you are selected to go to ${dest}. Two years, sometimes more. Your salary in Cuba continues; your family receives a portion. The state considers this diplomacy, solidarity, the export of the Revolution's accomplishment in healthcare. You think of it as an assignment. The conditions in ${dest} are what they are — you are there to address them. When you return, you will have seen a version of poverty that is different from Cuban poverty, and a version of political dysfunction that is different from Cuban political dysfunction. The comparison will not settle in the direction the state intends.`
    },
    choices: [
      {
        text: 'Go. The mission is an opportunity, whatever it is also.',
        tag: null,
        outcome: 'You go. The two years are real years, with real patients and real colleagues and real loneliness. You come back different from how you left, in ways that are difficult to specify.',
        effect: (p) => {
          p.e += 4
          p.w += 3
          p.r += 5
          p.addFlag('cub_doctor_export')
          p.setMem('cubDepDoctorMission', true)
        },
      },
      {
        text: 'Decline if possible. Your family needs you here.',
        tag: null,
        outcome: 'Declining is possible but carries a note in your file. The note does not prevent anything. It is noted.',
        effect: (p) => {
          p.r += 4
          p.karma += 2
          p.setMem('cubDepDoctorMission', true)
        },
      },
    ],
    effect: null,
  },

  // ── ELIÁN GONZÁLEZ ────────────────────────────────────────────────────────

  {
    id: 'cub_dep_elian',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1999 && G.currentYear <= 2001 &&
      G.age >= 18 &&
      !G.mem?.cubDepElian,
    text: 'November 1999. A five-year-old boy, Elián González, is found floating on an inner tube in the Florida Strait. His mother drowned. His Miami relatives claim custody. His father, still in Cuba, wants him back. The US courts eventually order his return and the armed INS raid on the Miami house produces the photograph — the agent, the closet, the terrified child, the gun — that will circulate for decades. In Cuba, the case is understood as a referendum on the Revolution: the Empire tried to steal a Cuban child and the Revolution brought him home. You attend the rallies. Or you don\'t attend but you watch the coverage. The specific lesson the case teaches about the relationship between Cuba and the Cuban diaspora will stay with you for the next twenty years.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.addFlag('cub_elian_generation')
      p.setMem('cubDepElian', true)
    },
  },

  // ── DUAL CURRENCY ECONOMY ─────────────────────────────────────────────────

  {
    id: 'cub_dep_dual_currency',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1994 && G.currentYear <= 2021 &&
      G.age >= 18 &&
      !G.mem?.cubDepDualCurrency,
    text: 'There are two currencies. The CUP — the Cuban peso — which you earn from your state job at the rate the state sets. The CUC — the convertible peso, pegged to the dollar — which the tourist economy runs on and which you need to buy what the state shops don\'t carry. The gap between what a state salary buys and what a CUC economy costs is the gap between two Cubas that share the same streets. The waiter at the tourist hotel who earns more in tips in a week than a doctor earns in a month in Cuban pesos. The family with remittances in Miami dollars. The family without. The question everyone carries is which side of the gap you are on and what you are prepared to do about it. In 2021 the dual currency will be unified — into a single system that creates its own problems. But for twenty-seven years this is the mathematics of daily life.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 2
      p.addFlag('cub_dual_currency_era')
      p.setMem('cubDepDualCurrency', true)
    },
  },

  // ── CUBAN EDUCATION PRIDE ─────────────────────────────────────────────────

  {
    id: 'cub_dep_education',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1962 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.cubDepEducation,
    text: 'The school has no computers — or has computers that do not connect to the internet, or has internet that is controlled, depending on which decade you are in. What the school does have: teachers who are paid the same as everyone else and are therefore not in teaching for the money, which means they are in it for the calling or not in it at all. The literacy rate is 99.7 percent. The class includes everyone regardless of family income because there is no school that can be privately purchased. You study with children of cane cutters and children of engineers, and the curriculum is the same for all of them, and the outcome is the same for all of them in ways that produce doctors and engineers at rates that are statistically remarkable for a country this poor.',
    choices: null,
    effect: (p) => {
      p.e += 4
      p.m += 2
      p.addFlag('cub_education_generation')
      p.setMem('cubDepEducation', true)
    },
  },

  // ── EXIT VISA SYSTEM ──────────────────────────────────────────────────────

  {
    id: 'cub_dep_exit_visa',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1963 && G.currentYear <= 2012 &&
      G.age >= 18 &&
      !G.mem?.cubDepExitVisa,
    text: 'To leave Cuba — even to travel — you need the tarjeta blanca, the white card, the exit permit. It must be applied for and approved. It is not always approved. The application itself requires a reason: medical treatment, a conference, a relative\'s funeral. The state does not owe you an explanation for the denial. What the exit visa system produces is not just the inability to leave but the knowledge that you could be prevented from leaving, which is a different kind of unfreedom from being unable to afford the ticket. After 2013, Raúl removes the requirement. The first time you apply for a passport that does not require government approval to be used, you notice what the absence of the requirement feels like: lighter than you expected, because the weight had been so ordinary.',
    choices: [
      {
        text: 'Apply for an exit visa. You have somewhere you need to go.',
        tag: 'cub_dep_applied_exit',
        outcome: 'The application takes months. The answer is yes, or is no, and either way the process has demonstrated something about your relationship to the state.',
        effect: (p) => {
          p.r += 5
          p.addFlag('cub_exit_visa_era')
          p.setMem('cubDepExitVisa', true)
        },
      },
      {
        text: 'Don\'t apply. You know what the application process is.',
        tag: null,
        outcome: 'Not applying is also a decision about your relationship to the state.',
        effect: (p) => {
          p.r += 4
          p.addFlag('cub_exit_visa_era')
          p.setMem('cubDepExitVisa', true)
        },
      },
    ],
    effect: null,
  },

  // ── PARAGRAPH 69: GAY CUBA ────────────────────────────────────────────────

  {
    id: 'cub_dep_paragraph_69',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1963 && G.currentYear <= 1979 &&
      G.age >= 16 && G.age <= 30 &&
      G.flags.has('lgbtq_identity') &&
      !G.mem?.cubDepParagraph69,
    text: 'The revolutionary state does not officially recognise homosexuality as a crime but does recognise it as a social pathology incompatible with the New Man the Revolution is building. The UMAP — Unidades Militares de Ayuda a la Producción — are labour camps that receive, among others, gay men. University Paragraph 69 expels students deemed "immoral." The CDR can report you. The specific texture of managing your identity in the revolutionary Cuba of the 1960s and 70s: the constant calibration of what can be seen and what must not be, in a society whose stated purpose is the transparent community. Reinaldo Arenas will write about this. He will write about it from exile. The writing will not reach you for a long time.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 7
      p.h -= 3
      p.addFlag('cub_lgbtq_suppression')
      p.setMem('cubDepParagraph69', true)
    },
  },

  // ── GRAY PERIOD CULTURAL CENSORSHIP ──────────────────────────────────────

  {
    id: 'cub_dep_gray_period',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1971 && G.currentYear <= 1980 &&
      G.age >= 18 &&
      (G.flags.has('writer') || G.flags.has('artist') || G.flags.has('musician') || G.career?.field === 'arts') &&
      !G.mem?.cubDepGray,
    text: 'The First National Congress on Education and Culture, 1971. Fidel\'s declaration: "Inside the Revolution, everything. Outside the Revolution, nothing." The quinquenio gris — the gray five-year period — extends longer than five years in practice: the writers blacklisted, the films shelved, the cultural figures exiled into internal administrative jobs, the UNEAC that controls what can be published and what cannot. Herberto Padilla was arrested and forced to confess. The confession was read on television. The intellectuals who had celebrated the Revolution from Paris and Havana wrote their open letter. The letter did not change anything. You are a cultural worker inside this period. The question is what you make and what you keep in the drawer.',
    choices: [
      {
        text: 'Work within the parameters. Something can be made within them.',
        tag: 'cub_dep_cultural_compliance',
        outcome: 'You find what can be made within the parameters and make it well. The work that survives this period is sometimes better for the constraint. You are not certain this is a clean argument.',
        effect: (p) => {
          p.r += 5
          p.e += 2
          p.addFlag('cub_cultural_conformity')
          p.setMem('cubDepGray', true)
        },
      },
      {
        text: 'Keep the real work in the drawer. Wait.',
        tag: null,
        outcome: 'The drawer accumulates. The drawer becomes your real career, the public work becoming an alibi for the drawer. This is a way to live. It is not the way you imagined living.',
        effect: (p) => {
          p.r += 6
          p.m -= 4
          p.addFlag('writing_in_drawer')
          p.setMem('cubDepGray', true)
        },
      },
    ],
    effect: null,
  },

  // ── VIÑALES TOBACCO ───────────────────────────────────────────────────────

  {
    id: 'cub_dep_vinales_tobacco',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1960 &&
      G.age >= 16 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.cubDepVinales,
    text: 'The vega in Viñales: the tobacco plot, the vegas in the valley between the mogotes, the limestone formations that were here before any politics. The tabaquero work: the seedbed in December, the transplanting, the curing house, the specific knowledge of when to harvest which leaf from which position on the stalk. The tobacco cooperative is state-managed now, the production quota set in Havana. The tabaquero who knows this soil and has always known it knows things that the quota does not know. The cigar factories in Havana use what comes from the vega. The cigars go to the world. What comes back to the vega is what the state decides comes back.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.addFlag('cub_rural_tobacco')
      p.setMem('cubDepVinales', true)
    },
  },

]

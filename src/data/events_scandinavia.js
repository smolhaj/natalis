// events_scandinavia.js
// Scandinavia and Nordic region character events.
// Countries: Norway, Sweden, Denmark, Finland, Iceland.
// Covers: welfare state from inside, Norway oil, Finland Winter War,
// Sweden WWII neutrality, Janteloven, the specific texture of Nordic life.

const NORDIC_COUNTRIES = new Set(['Norway', 'Sweden', 'Denmark', 'Finland', 'Iceland'])
const SCANDINAVIAN_COUNTRIES = new Set(['Norway', 'Sweden', 'Denmark'])

function isNordic(G) { return NORDIC_COUNTRIES.has(G.character?.country?.name ?? '') }
function isScandinavian(G) { return SCANDINAVIAN_COUNTRIES.has(G.character?.country?.name ?? '') }

export const SCANDINAVIA_EVENTS = [

  // ── WELFARE STATE FROM INSIDE ─────────────────────────────────────────────────

  {
    id: 'scan_welfare_state_texture',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      isNordic(G) &&
      G.age >= 18 && G.age <= 30 &&
      (G.currentYear ?? 0) >= 1970 &&
      !G.mem?.scanWelfareDone,
    text: (G) => {
      const country = G.character?.country?.name ?? ''
      const yr = G.currentYear ?? 1990
      if (country === 'Norway') {
        if (yr >= 1980) {
          return 'You have been told, by people from elsewhere, that Norway is expensive and cold. This is true. You have also grown up knowing that illness will not bankrupt your family, that university costs almost nothing, that the state regards your childhood as something worth investing in. The specifics of this — a dentist appointment, a textbook, a year of parental leave — are simply there, unremarkable until they are not.'
        }
        return 'The welfare state is not an abstraction. It is the student loan you did not take out, the doctor you went to without considering the cost, the parental leave your mother had. The fabric is visible only when it is absent elsewhere.'
      }
      if (country === 'Finland') {
        return 'The Finnish welfare state is built partly on *sisu* — the gut persistence that got you through the Winter War — and partly on a pragmatic belief that equality is efficient. The school you attend is not separated by class; the child beside you is the child of a professor and the child of a factory worker and the difference in their educational opportunity is deliberately small. You do not have a word for this in your daily life. It is just how school works.'
      }
      if (country === 'Sweden') {
        return 'The *folkhem* — the people\'s home — is not propaganda here; it is the physical arrangement of your childhood. The healthcare, the schools, the parental leave, the housing subsidies, the unemployment insurance. Sweden built the most comprehensive welfare state on earth by 1970 and you have grown up inside it. The question of whether it will hold is one your parents\' generation asks. Yours inherits it.'
      }
      return 'Growing up here means growing up in a system that assumes you will not be left to manage disaster alone. This is not universal. You have met people from elsewhere who find the security incomprehensible.'
    },
    effect: (p) => { p.m += 6; p.h += 4; p.setMem('scanWelfareDone', true) },
    choices: null,
  },

  {
    id: 'scan_welfare_state_crisis',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      isNordic(G) &&
      G.age >= 30 && G.age <= 55 &&
      (G.currentYear ?? 0) >= 1990 &&
      G.mem?.scanWelfareDone === true &&
      !G.mem?.scanWelfareCrisisDone,
    text: (G) => {
      const country = G.character?.country?.name ?? ''
      const yr = G.currentYear ?? 1995
      if (country === 'Sweden' && yr >= 1990 && yr <= 1996) {
        return 'The 1990s crisis hit Sweden harder than it had expected: the banking collapse, the currency peg abandoned, unemployment tripling. The welfare state contracted. Certain things you grew up expecting as background assumptions — the comprehensive provision, the managed redundancy system — are being renegotiated. The debate is about what the *folkhem* was, and whether it can remain what it was.'
      }
      if (country === 'Finland' && yr >= 1990 && yr <= 1995) {
        return 'The Soviet Union\'s collapse took Finland\'s largest export market with it. GDP fell by thirteen percent in three years. Unemployment went from three percent to twenty. The welfare state was not abolished but it was revised under austerity in ways that will take a generation to fully understand. Your parents\' generation built it; your generation is learning which parts were conditional.'
      }
      return 'The Nordic model is under pressure. The immigration debates, the pension arithmetic, the question of what the system owes to people who arrived after the system was built. You have views on these questions. They are complicated views, held by a person who has benefited substantially from the answers of the generation before yours.'
    },
    effect: (p) => { p.m -= 5; p.e += 5; p.setMem('scanWelfareCrisisDone', true) },
    choices: null,
  },

  // ── JANTELOVEN ───────────────────────────────────────────────────────────────

  {
    id: 'scan_janteloven',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      isScandinavian(G) &&
      G.age >= 20 && G.age <= 38 &&
      (G.stats.smarts >= 65 || G.career?.level >= 2) &&
      !G.mem?.scanJantelovenDone,
    text: (G) => {
      const country = G.character?.country?.name ?? ''
      const countryProse = country === 'Denmark'
        ? 'The Danish'
        : country === 'Norway'
        ? 'The Norwegian'
        : 'The Swedish'
      return `${countryProse} code is old but operational: *Du skal ikke tro du er noe* — you shall not think you are special. You have achieved something you are genuinely proud of. The social pressure is not to deny it, exactly, but to minimise it, to deflect the acknowledgement, to change the subject. You understand why this code exists — equality requires it — and also what it costs in the specific case of being you, now, in this room.`
    },
    choices: [
      {
        text: 'Honour the code — the culture\'s cohesion depends on it',
        tag: null,
        outcome: 'You fold the achievement back. The belonging is real and costs something that is also real.',
        effect: (p) => { p.s += 5; p.m += 3; p.r += 4; p.setMem('scanJantelovenDone', true) },
      },
      {
        text: 'Name what you have done — you earned it',
        tag: null,
        outcome: 'The room cools slightly. You are not wrong. This is also noted.',
        effect: (p) => { p.m += 4; p.s -= 4; p.addFlag('broke_janteloven'); p.setMem('scanJantelovenDone', true) },
      },
    ],
    effect: null,
  },

  // ── NORWAY OIL ───────────────────────────────────────────────────────────────

  {
    id: 'scan_norway_oil',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character?.country?.name === 'Norway' &&
      G.age >= 18 && G.age <= 40 &&
      (G.currentYear ?? 0) >= 1975 && (G.currentYear ?? 0) <= 2010 &&
      !G.mem?.scanNorwayOilDone,
    text: (G) => {
      const yr = G.currentYear ?? 1985
      if (yr < 1980) {
        return 'The oil was discovered off Stavanger in 1969. Norway is not spending it yet — there is a political argument happening about what a poor-in-living-memory country owes to the future. The debate is serious and specific. The decision being made now will shape what you inherit.'
      }
      if (yr < 2000) {
        return 'The oil fund has been accumulating for a decade. Norway has managed to extract and not simply spend — the sovereign wealth fund now holds more money than most people can conceptualise. You grew up in a country that was not wealthy within living memory. You are now in one that is among the wealthiest on earth. The transition carries its own questions about what this means for who you are as a country.'
      }
      return 'The oil wealth is the background condition of contemporary Norwegian life — the reason the welfare state is not in the austerity discussion that affects other countries, the reason the interest rates are navigable, the reason certain things are possible that elsewhere are not. The fund also represents the carbon that is somewhere in the atmosphere. Both of these are true.'
    },
    effect: (p) => { p.m += 5; p.e += 4; p.setMem('scanNorwayOilDone', true) },
    choices: null,
  },

  // ── FINLAND WINTER WAR ────────────────────────────────────────────────────────

  {
    id: 'scan_finland_winter_war',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      G.character?.country?.name === 'Finland' &&
      (G.currentYear ?? 0) >= 1939 && (G.currentYear ?? 0) <= 1942 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.scanWinterWarDone,
    text: (G) => {
      const yr = G.currentYear ?? 1940
      const isKarelia = G.mem?.isKarelian === true
      if (isKarelia) {
        return 'The Soviet forces are closing on Karelia. The evacuation order comes in winter. Your family packs what fits in a cart and leaves the house your grandfather built. You do not know you will not go back. The frost is severe. The road is full of families in the same column. Finland will win, technically, in the sense that it will survive. Karelia will not be returned.'
      }
      return `The war began in November 1939. The Soviet Union has 450,000 troops and Finland has fewer than half that, and is alone. On the radio, the reports use the word *sisu*. The word has always meant something. It means something different now — it is the explanation your country is giving itself for why it is still here.`
    },
    choices: [
      {
        text: 'Your family stays and endures',
        tag: null,
        outcome: 'Finland survives. The Moscow Peace Treaty cedes Karelia. 400,000 Karelians are displaced. Your family is one of them, or is not — the line runs through every Finnish family of this generation.',
        effect: (p) => { p.m -= 10; p.h -= 5; p.addFlag('winter_war_child'); p.setMem('scanWinterWarDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'scan_finland_karelian_exile',
    phase: 'childhood',
    weight: 6,
    when: (G) =>
      G.character?.country?.name === 'Finland' &&
      G.flags.has('winter_war_child') &&
      G.age >= 8 && G.age <= 18 &&
      !G.mem?.scanKarelianExileDone,
    text: 'Your family is among the 400,000 Karelians resettled inside Finland after the Moscow Peace Treaty. You are Finnish — always were, always will be — but you are also from a place that is now Soviet territory, that you cannot visit, that exists in your family\'s conversation as a geography of the past. The house your grandfather built is being used by someone else. The country still speaks of it as *Karjala*. The grief is passed down without anyone deciding to pass it down.',
    effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('karelian_exile'); p.setMem('scanKarelianExileDone', true) },
    choices: null,
  },

  // ── SWEDEN WWII NEUTRALITY ────────────────────────────────────────────────────

  {
    id: 'scan_sweden_neutrality',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character?.country?.name === 'Sweden' &&
      (G.currentYear ?? 0) >= 1940 && (G.currentYear ?? 0) <= 1945 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.scanSwedenNeutralityDone,
    text: (G) => {
      const yr = G.currentYear ?? 1942
      return `Sweden is not at war. This requires a specific kind of navigation — the German troops who transit Swedish railways on the way to Norway and Finland and back; the iron ore that Swedish mines supply to German industry; the Jews who escape here from occupied Denmark in the autumn of 1943. You benefit from the peace in specific ways. You also know what the peace has required. You do not discuss this openly. Almost no one in Sweden does.`
    },
    choices: [
      {
        text: 'The moral calculation is bearable — surviving intact is something',
        tag: null,
        outcome: 'Sweden survives the war without occupation. The moral account will be settled, awkwardly, over the decades that follow.',
        effect: (p) => { p.m += 4; p.r += 6; p.setMem('scanSwedenNeutralityDone', true) },
      },
      {
        text: 'Find a way to help those who arrive — the neutrality does not have to be passive',
        tag: null,
        outcome: 'The Danish Jews who cross the Øresund in fishing boats in October 1943 need someone on the other side. You are on the other side.',
        effect: (p) => { p.m += 8; p.karma += 12; p.addFlag('helped_refugees_ww2'); p.setMem('scanSwedenNeutralityDone', true) },
      },
    ],
    effect: null,
  },

  // ── NORDIC EMIGRATION WAVE ────────────────────────────────────────────────────

  {
    id: 'scan_emigration_wave',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      isNordic(G) &&
      G.age >= 30 && G.age <= 50 &&
      (G.currentYear ?? 0) >= 2000 &&
      !G.mem?.scanEmigrationWaveDone,
    text: (G) => {
      const country = G.character?.country?.name ?? ''
      return `People are leaving ${country}, or talking about leaving. The welfare state is intact but the social debate has shifted — the immigration question, the cost of living in the cities, the winters that a generation of Norwegians and Swedes and Danes have decided to spend in Spain or Thailand. Some of them come back. Some of them don't. You have considered the question yourself.`
    },
    choices: [
      {
        text: 'The country you were born in is worth staying for',
        tag: null,
        outcome: 'You stay. The staying is active rather than passive. You remain in the conversation.',
        effect: (p) => { p.m += 5; p.setMem('scanEmigrationWaveDone', true) },
      },
      {
        text: 'You have been thinking about elsewhere for a while',
        tag: null,
        outcome: 'The elsewhere is possible. You are not sure yet what it requires.',
        effect: (p) => { p.m += 3; p.addFlag('considering_emigration'); p.setMem('scanEmigrationWaveDone', true) },
      },
    ],
    effect: null,
  },

]

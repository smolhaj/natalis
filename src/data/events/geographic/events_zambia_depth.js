// events_zambia_depth.js
// Zambia depth: the BaTonga displacement by Kariba Dam (1957–58), Copperbelt mine
// closure towns (Luanshya, Konkola), the AIDS orphan generation (raised by
// grandparents after parents died), Lusaka compound life (George, Kanyama),
// the post-SAP mealie meal crisis, and Chinese copper operations (Collum Coal 2010s).
//
// Companion to events_zambia.js (Kaunda Humanism, Copperbelt, copper crash,
// democratic transition, AIDS crisis, evangelical wave).

const IS_ZAMBIA = (G) => G.character.country?.name === 'Zambia'
const IS_TONGA = (G) =>
  IS_ZAMBIA(G) && G.character.ethnicity === 'tonga_zambia'

export const ZAMBIA_DEPTH_EVENTS = [

  // ── BATONGA KARIBA DAM DISPLACEMENT ──────────────────────────────────────

  {
    id: 'zmb_dep_tonga_kariba',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_TONGA(G) &&
      G.currentYear >= 1955 && G.currentYear <= 1965 &&
      G.age >= 5 && G.age <= 18 &&
      !G.mem?.zmbDepTongaKariba,
    text: `The Kariba Dam was built between 1955 and 1959 across the Zambezi Gorge, creating one of the world's largest man-made lakes. The BaTonga people — approximately 57,000 of them — lived in the river valley and the gorge and were told to move. Many refused. The water would not rise, they said: Nyaminyami, the river spirit whose domain this was, would not permit it. The water rose. The villages went under. The government brought lorries and moved people to resettlement areas on the plateau that did not have the river access, the fishing rights, the specific ecology the BaTonga had organised their lives around for centuries. Your family is one of the families that moved or was moved.`,
    choices: [
      {
        text: 'Your family moved. The new place was not the old place and has never become the old place.',
        tag: null,
        outcome: 'The plateau land is different soil, different water access, different everything. Two generations on, the knowledge of the river valley exists in stories.',
        effect: (p) => {
          p.m -= 10
          p.r += 7
          p.addFlag('zmb_dep_tonga_kariba')
          p.addFlag('displaced')
          p.setMem('zmbDepTongaKariba', true)
        },
      },
      {
        text: 'Your family refused and was moved by force. Nyaminyami was not sufficient protection against the engineering.',
        tag: null,
        outcome: 'The forced movement was documented by anthropologists who later wrote papers about it. The papers are in universities. The displaced Tonga are in resettlement areas. The lake is one of the world\'s largest.',
        effect: (p) => {
          p.m -= 14
          p.r += 8
          p.karma += 3
          p.addFlag('zmb_dep_tonga_kariba')
          p.addFlag('displaced')
          p.setMem('zmbDepTongaKariba', true)
        },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH: TONGA LATE WITNESS ───────────────────────────────────

  {
    id: 'zmb_dep_tonga_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_ZAMBIA(G) &&
      G.flags.has('zmb_dep_tonga_kariba') &&
      G.age >= 55 &&
      !G.mem?.zmbDepTongaEcho,
    text: `The lake is sixty years old now. It generates electricity for Zambia and Zimbabwe. The tourist boats run on it. The Tonga displacement has been studied and written about and occasionally cited in discussions of development ethics and compensation. The compensation was inadequate and mostly went to village headmen who distributed it in ways that didn't reach everyone. You are one of the people who carries this in memory rather than in any record. The village that is under the water is under the water.`,
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 4
      p.karma += 3
      p.setMem('zmbDepTongaEcho', true)
    },
  },

  // ── COPPERBELT CLOSURE TOWN ───────────────────────────────────────────────

  {
    id: 'zmb_dep_copper_closure',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_ZAMBIA(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1990 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.zmbDepCopperClosure,
    text: `Luanshya. Mufulira. Konkola. The mine closed or was privatised at a fraction of its value to a buyer who cut the workforce and maintained neither the housing nor the infrastructure the company town had provided. The clinic is still there and is understaffed. The housing is still there and is deteriorating. The infrastructure was never meant to run without the company maintaining it. The second generation — your generation — grew up in what the company town becomes after the company: a place with the infrastructure of prosperity and the economy of poverty. ZCCM is gone. The mine is owned by a consortium from somewhere else. The wages for the remaining miners are lower than they were.`,
    choices: [
      {
        text: 'You find work in what remains — the privatised mine, the informal trade, the connections.',
        tag: null,
        outcome: 'The work is there but diminished. The Copperbelt economy is real but smaller and less secure than what your parents describe.',
        effect: (p) => {
          p.mo += 400
          p.m -= 4
          p.addFlag('zmb_dep_copper_closure')
          p.setMem('zmbDepCopperClosure', true)
        },
      },
      {
        text: 'You leave for Lusaka. The Copperbelt was your parents\' economy, not yours.',
        tag: null,
        outcome: 'Lusaka has its own economies and its own compound life. You build in the new city what the old city no longer offers.',
        effect: (p) => {
          p.addFlag('zmb_dep_copper_closure')
          p.addFlag('rural_urban_migrant')
          p.setMem('zmbDepCopperClosure', true)
        },
      },
    ],
    effect: null,
  },

  // ── AIDS ORPHAN GENERATION ────────────────────────────────────────────────

  {
    id: 'zmb_dep_aids_orphan',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_ZAMBIA(G) &&
      G.currentYear >= 1993 && G.currentYear <= 2010 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.zmbDepAidsOrphan,
    text: `By 1995, Zambia's HIV/AIDS prevalence among adults was approaching twenty percent in urban areas. The life expectancy fell to forty years. The generation between twenty and forty bore most of the dying, which means the generation between six and sixteen bore most of the orphaning. Grandmothers became the primary caregivers for hundreds of thousands of children. The grandmother's garden — the kitchen garden, the nshima from the maize she grew — became the food system for children who had no parents to feed them. You are in one of these households: the grandparent raising the grandchildren, the household that persists because the generation between them did not.`,
    choices: [
      {
        text: 'Your grandmother raised you. The garden and the church were the structure of your childhood.',
        tag: null,
        outcome: 'The grandmother\'s care was total and tired. The church filled in what the household couldn\'t. You grew up knowing what the household had cost and what it continued to give.',
        effect: (p) => {
          p.m -= 6
          p.r += 5
          p.karma += 3
          p.addFlag('zmb_dep_aids_orphan')
          p.setMem('zmbDepAidsOrphan', true)
        },
      },
      {
        text: 'An older sibling raised you. The sibling was young enough to still need raising themselves.',
        tag: null,
        outcome: 'The sibling did what was required. Neither of you fully knew what you were doing. The household survived on the basis of that.',
        effect: (p) => {
          p.m -= 8
          p.r += 6
          p.e += 2
          p.addFlag('zmb_dep_aids_orphan')
          p.setMem('zmbDepAidsOrphan', true)
        },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH: AIDS ORPHAN ADULT ────────────────────────────────────

  {
    id: 'zmb_dep_aids_orphan_adult',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_ZAMBIA(G) &&
      G.flags.has('zmb_dep_aids_orphan') &&
      G.age >= 22 && G.age <= 35 &&
      !G.mem?.zmbDepAidsOrphanAdult,
    text: `Your grandparent who raised you is old or gone now. You are the adult. The gap in the middle generation is part of the specific shape of your life — the absence of parents between you and the people who raised you, the absence of aunts and uncles in their expected numbers. You are from a generation with a different demographic structure. You build your adult life in this structure: with more responsibility for the generation above, less resource from the generation that should have been between you.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m -= 4
      p.karma += 3
      p.setMem('zmbDepAidsOrphanAdult', true)
    },
  },

  // ── LUSAKA COMPOUND LIFE ──────────────────────────────────────────────────

  {
    id: 'zmb_dep_compound_lusaka',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_ZAMBIA(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1975 && G.currentYear <= 2010 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.zmbDepCompound,
    text: `The compound around Lusaka: George, Kanyama, Kalingalinga, Matero. These are the informal settlements that grew as the city grew, where the formal housing policy didn't reach, where the charcoal sellers and the market vendors and the domestic workers and the piece-rate construction labourers live. The houses are brick and zinc and concrete block. The tap is at the end of the road. The children play in the road because the road is available. The church — Pentecostal, more likely than not, since the 1990s — is around the corner. The compound has a density and a social life that the planned residential areas don't have.`,
    choices: null,
    effect: (p) => {
      p.s += 2
      p.r += 2
      p.addFlag('zmb_dep_compound_lusaka')
      p.setMem('zmbDepCompound', true)
    },
  },

  // ── POST-SAP MEALIE MEAL CRISIS ───────────────────────────────────────────

  {
    id: 'zmb_dep_mealie_crisis',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_ZAMBIA(G) &&
      G.currentYear >= 1986 && G.currentYear <= 1996 &&
      G.age >= 10 && G.age <= 22 &&
      !G.mem?.zmbDepMealie,
    text: `Mealie meal — ground maize, the staple — was subsidised by the state for the urban poor. Kaunda kept it cheap because removing the subsidy would mean the cities went hungry, which is what happened in 1986 and 1990 when he tried and the bread riots forced reversals. Under Chiluba and structural adjustment the subsidy was finally removed. The price of mealie meal tripled in weeks. The urban poor — which is most of the urban population — spent a larger fraction of a smaller income on the one food that was central to the diet. The household economy reorganized around the new price. You know what a household reorganizes around in this way.`,
    choices: [
      {
        text: 'The family ate less. The less was distributed specifically — the children first, the adults working with what remained.',
        tag: null,
        outcome: 'The distribution pattern in the hungry household is its own kind of knowledge. You know it from the inside. The outside doesn\'t have this information.',
        effect: (p) => {
          p.h -= 4
          p.r += 4
          p.addFlag('zmb_dep_mealie_generation')
          p.addFlag('food_insecurity')
          p.setMem('zmbDepMealie', true)
        },
      },
      {
        text: 'The family found alternatives — cassava from relatives in the village, the informal market, arrangement.',
        tag: null,
        outcome: 'The resilience was real and required. The network of rural relatives that urban families maintained became useful in this specific way.',
        effect: (p) => {
          p.h -= 2
          p.r += 3
          p.addFlag('zmb_dep_mealie_generation')
          p.setMem('zmbDepMealie', true)
        },
      },
    ],
    effect: null,
  },

  // ── CHINESE COPPER ERA ────────────────────────────────────────────────────

  {
    id: 'zmb_dep_chinese_copper',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_ZAMBIA(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 2005 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.zmbDepChinese,
    text: `Chinese investment in the Zambian Copperbelt: the Collum Coal Mine in Sinazongwe, CNMC Luanshya Copper Mine, NFC Africa at Chambishi. The investment is real and the employment is real and the wages and safety standards are below what ZCCM provided and the relationship between Chinese management and Zambian workers has produced incidents — the Collum Coal Mine shooting in 2010, where two Chinese managers shot eleven protesting miners — that are reported internationally and resolved locally by the silence that all mining communities develop around the fact that the mine is the economy and the economy requires the mine.`,
    choices: [
      {
        text: 'You work in the Chinese-owned operation. The pay is below what your parents describe from ZCCM but it is employment.',
        tag: null,
        outcome: 'The comparison with what your parents had is not a neutral comparison. It describes something real about what changed and who got the value.',
        effect: (p) => {
          p.mo += 500
          p.h -= 3
          p.m -= 4
          p.addFlag('zmb_dep_chinese_copper')
          p.setMem('zmbDepChinese', true)
        },
      },
      {
        text: 'You observe the situation from outside the mine — in the service economy, in the town — and have opinions about what it represents.',
        tag: null,
        outcome: 'The service economy in a mining town is still the mining economy by a different route. Your opinions are shared by most of the town. The mine continues regardless.',
        effect: (p) => {
          p.r += 4
          p.e += 2
          p.addFlag('zmb_dep_chinese_copper')
          p.setMem('zmbDepChinese', true)
        },
      },
    ],
    effect: null,
  },

]

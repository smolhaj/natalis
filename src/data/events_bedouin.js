// events_bedouin.js
// Bedouin sedentarisation arc (Saudi Arabia, Jordan, 1950s–1970s)
//
// The nomadic-to-settled transition was one of the largest involuntary
// social transformations of the 20th century in the Arabian Peninsula.
// Saudi Arabia incentivised settlement from the 1950s; the government
// wanted a sedentary population for census, taxation, and conscription.
// Jordan settled its eastern tribes through similar mechanisms under
// King Hussein. The transition happened fast: within a single generation,
// families who had migrated seasonally for centuries moved into concrete
// houses with government-supplied water. What was lost was specific:
// navigation knowledge, animal husbandry at scale, the social structure
// of the tribal migration unit.

const IS_BEDOUIN = (G) => ['bedouin_saudi', 'bedouin_jordanian'].includes(G.ethnicity)

export const BEDOUIN_EVENTS = [

  // ── NOMADIC CHILDHOOD ────────────────────────────────────────────────────

  {
    id: 'bdo_tent_childhood',
    phase: 'childhood',
    weight: 9,
    when: (G) => IS_BEDOUIN(G) && G.currentYear <= 1970 && G.age >= 6 && G.age <= 14 && !G.mem.bdoTentChild,
    text: 'The tent comes down in a morning. Every person in the family knows which pole is theirs, which rope, which weight. The camels are loaded in a sequence your father learned from his father. You are moving because the season has ended here and the grazing is better three days north. You know the route by the shape of specific dunes, by the colour of the rock at a particular pass, by the position of certain stars after dark. This knowledge is not taught explicitly. It is acquired through the doing of it.',
    choices: null,
    effect: (p) => { p.e += 4; p.h += 3; p.addFlag('bedouin_nomad_childhood'); p.setMem('bdoTentChild', true) },
  },

  // ── THE SETTLEMENT OFFER ─────────────────────────────────────────────────

  {
    id: 'bdo_settlement_government',
    phase: 'young_adult',
    weight: 7,
    when: (G) => IS_BEDOUIN(G) && G.currentYear >= 1950 && G.currentYear <= 1978 && G.age >= 18 && G.age <= 45 && !G.mem.bdoSettle,
    text: (G) => {
      const country = G.character?.country?.name
      const agent = country === 'Jordan' ? 'The district officer arrives from Amman' : 'The government representative arrives from Riyadh'
      const incentive = country === 'Jordan' ? 'a registered plot, a small house, and access to the new school' : 'a house, a monthly stipend, and access to the water pipeline'
      return `${agent} with an offer that is also an understanding. The king wants his people settled. In exchange: ${incentive}. Your tribe's range is being mapped, titled, and allocated. The migration corridors are narrowing — a new road here, a restricted zone there. Other families have already gone. The offer is genuine. The alternative to the offer is not permanent nomadism. It is a slower version of the same transition, without the subsidy.`
    },
    choices: [
      {
        text: 'Accept. The water alone is worth it.',
        tag: null,
        outcome: 'The house is concrete. The ceiling does not move in the wind. The water comes from a pipe you did not dig. These are gains that are real.',
        effect: (p) => { p.m += 3; p.h += 5; p.addFlag('bedouin_settled'); p.addFlag('bdo_settled_first_gen'); p.setMem('bdoSettle', true) },
      },
      {
        text: 'Negotiate — the pasture rights matter.',
        tag: null,
        outcome: 'You get the house and partial recognition of seasonal grazing rights. The rights are on paper. In ten years the development has moved past the paper. You got what you could.',
        effect: (p) => { p.m -= 4; p.addFlag('bedouin_settled'); p.addFlag('bdo_settled_first_gen'); p.karma += 3; p.setMem('bdoSettle', true) },
      },
    ],
  },

  // ── THE CONCRETE HOUSE ───────────────────────────────────────────────────

  {
    id: 'bdo_concrete_house_texture',
    phase: 'young_adult',
    weight: 5,
    when: (G) => IS_BEDOUIN(G) && G.flags.has('bedouin_settled') && G.age >= 20 && G.age <= 40 && !G.mem.bdoHouseText,
    text: 'The house is solid. That is undeniable and it is something. But the ceiling is the wrong height — not wrong for a building, wrong for a person who learned to calibrate space in an open tent. The walls face the wrong direction: a tent orients itself to the prevailing wind; a house is perpendicular to the road. The children can sleep in rain. The children can drink clean water. These are the things that matter, and they are true, and the other thing is also true.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('bdoHouseText', true) },
  },

  // ── THE KNOWLEDGE THAT IS NO LONGER NEEDED ───────────────────────────────

  {
    id: 'bdo_navigation_lost',
    phase: 'midlife',
    weight: 5,
    when: (G) => IS_BEDOUIN(G) && G.flags.has('bdo_settled_first_gen') && G.age >= 35 && !G.mem.bdoNavLost,
    text: 'Your son asks how you would know which way was north without the phone. You show him: the star, the specific angle of the shadow at noon, the way the wind comes from the Nafud in the dry months. He understands the explanation. He does not need the knowledge. You realize, saying it aloud, that you have not used it yourself in fifteen years. The knowledge existed to get a family and their animals across four hundred kilometres of desert without getting lost or running out of water. The desert is still there. The family moves by road now.',
    choices: [
      {
        text: 'Write it down — the knowledge should not disappear',
        tag: null,
        outcome: 'You write down the star names in your dialect, the route markings, the water-reading signs. It is a document no one will need. You make it anyway.',
        effect: (p) => { p.karma += 5; p.r += 3; p.addFlag('bedouin_knowledge_keeper'); p.setMem('bdoNavLost', true) },
      },
      {
        text: 'Let it go. That life is over.',
        tag: null,
        outcome: 'You let it go. Your children have different knowledge — the road signs, the phone map, the bureaucratic forms. These are survival skills too, adapted to the world that exists.',
        effect: (p) => { p.r += 6; p.setMem('bdoNavLost', true) },
      },
    ],
  },

  // ── LATE RECKONING ───────────────────────────────────────────────────────

  {
    id: 'bdo_late_reckoning',
    phase: 'late_life',
    weight: 4,
    when: (G) => IS_BEDOUIN(G) && G.flags.has('bdo_settled_first_gen') && G.age >= 60 && !G.mem.bdoLateReck,
    text: 'Your grandchildren have never slept in a tent. They have never moved with the season. They know their tribe\'s name but not which grazing range it corresponds to — the range is subdivided now, sold or allocated. The gain is real: they are literate, they have health cards, they will live longer than you will. The loss is also real: a complete way of understanding space, time, and obligation — one that took thousands of years to develop — is gone in two generations. You were the hinge.',
    choices: null,
    effect: (p) => { p.r += 6; p.karma += 4; p.setMem('bdoLateReck', true) },
  },

]

// events_nepal_depth.js
// Nepal depth: Gurkha recruitment (the British/Indian Army tradition in Gurung/Magar/
// Rai/Limbu communities), Dalit discrimination under the caste system (Muluki Ain),
// Tharu bonded labor (Kamaiya freed 2000), mountain porter life, the remittance household,
// the living goddess (Kumari), and Pashupatinath cremation culture.
//
// Companion to events_nepal.js (Maoist war, earthquake, Gulf migration, republic).

const IS_NEPAL = (G) => G.character.country?.name === 'Nepal'
const IS_HILL_ETHNIC = (G) =>
  IS_NEPAL(G) &&
  ['gurung', 'magar', 'rai', 'limbu', 'tamang'].includes(G.character.ethnicity)
const IS_DALIT_NEPAL = (G) =>
  IS_NEPAL(G) && G.character.ethnicity === 'dalit_nepal'
const IS_THARU = (G) =>
  IS_NEPAL(G) && G.character.ethnicity === 'tharu'
const IS_NEWAR = (G) =>
  IS_NEPAL(G) && G.character.ethnicity === 'newar'

export const NEPAL_DEPTH_EVENTS = [

  // ── GURKHA RECRUITMENT ─────────────────────────────────────────────────────

  {
    id: 'nep_dep_gurkha_recruitment',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      IS_HILL_ETHNIC(G) &&
      G.currentYear >= 1950 && G.currentYear <= 2010 &&
      G.character.gender === 'male' &&
      G.age >= 15 && G.age <= 21 &&
      !G.mem?.nepDepGurkha,
    text: `The British Army Brigade of Gurkhas recruits from the hill villages — Gurung, Magar, Rai, Limbu — and has done since 1815. The selection is at the Pokhara depot: the hill run with a doko basket loaded with sand, the written tests, the physical examinations. Ten thousand boys apply each year. A few hundred are selected. For the hill villages this is one of the routes out of subsistence farming, one of the routes to a pension that is worth more than anything the agriculture produces, and the route requires a body that has already spent fifteen years walking altitude terrain. Your body qualifies. Whether you qualify on everything else is still being determined.`,
    choices: [
      {
        text: 'You are selected. The training begins. You leave the hill village.',
        tag: null,
        outcome: 'The village sends you off with ceremony. The depot is nothing like the village. You train with boys from other hills you have never met. The British officers call you by your first name and expect a specific kind of soldier.',
        effect: (p) => {
          p.m += 5
          p.h += 5
          p.mo += 1000
          p.addFlag('nep_dep_gurkha_generation')
          p.addFlag('emigrated')
          p.setResidency('work_visa')
          p.setMem('nepDepGurkha', true)
        },
      },
      {
        text: 'You do not pass selection. The return to the village is its own instruction in how much this mattered.',
        tag: null,
        outcome: 'The boys who failed filter back to the hills and to other futures. The Gulf. Kathmandu. The futures are not nothing. They are just not the one that passed the hill run.',
        effect: (p) => {
          p.m -= 6
          p.r += 4
          p.setMem('nepDepGurkha', true)
        },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH: GURKHA RETURNING ─────────────────────────────────────

  {
    id: 'nep_dep_gurkha_return',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_NEPAL(G) &&
      G.flags.has('nep_dep_gurkha_generation') &&
      G.age >= 55 &&
      !G.mem?.nepDepGurkhaReturn,
    text: `You served and you came back. The pension is in British pounds and it converts well to rupees and you are among the richer men in the village for it, which was the point, which was always the point. The village is different and you are different and the two differences do not always match. You know things about the world outside that the village doesn't know. The village knows things about continuity and place that you had to leave to find out you didn't have. The pension arrives monthly. The two worlds have no mechanism for reconciling themselves except through you, and through your children, who have their own feelings about which one to live in.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m += 3
      p.setMem('nepDepGurkhaReturn', true)
    },
  },

  // ── DALIT CASTE DISCRIMINATION ─────────────────────────────────────────────

  {
    id: 'nep_dep_dalit_water',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_DALIT_NEPAL(G) &&
      G.currentYear >= 1950 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.nepDepDalitWater,
    text: `The Muluki Ain — the 1854 legal code — classified Nepali society by caste and specified what each group could and could not do, touch, or approach. Dalits were untouchables: barred from the water source that the upper castes used, barred from the temple, barred from the tea shop where the higher-caste men sat. The code was officially abolished in 1963 but the practice, having been law for over a century, did not end with the law. You are at the upper-caste well. You have a container. The question of whether you may fill it is not resolved by the law but by the specific men who are already there and what they decide to enforce today.`,
    choices: [
      {
        text: 'You approach the well. What happens next depends on who is watching.',
        tag: null,
        outcome: 'What happens next depends on who is watching, and they are watching, and today it goes one of the ways it can go — either nothing, or something, and in this telling it is not nothing.',
        effect: (p) => {
          p.m -= 10
          p.r += 6
          p.addFlag('nep_dep_dalit_generation')
          p.addFlag('experienced_caste_discrimination')
          p.setMem('nepDepDalitWater', true)
        },
      },
      {
        text: 'You use the separate source. The indignity of the separate source is its own kind of answer.',
        tag: null,
        outcome: 'The separate source is the statement made in stone and practice: that you are separate. The water is the same water. The distance to it is different.',
        effect: (p) => {
          p.m -= 7
          p.r += 4
          p.addFlag('nep_dep_dalit_generation')
          p.addFlag('experienced_caste_discrimination')
          p.setMem('nepDepDalitWater', true)
        },
      },
    ],
    effect: null,
  },

  // ── KAMAIYA: THARU BONDED LABOR ───────────────────────────────────────────

  {
    id: 'nep_dep_kamaiya',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_THARU(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2003 &&
      G.age >= 16 && G.age <= 30 &&
      !G.mem?.nepDepKamaiya,
    text: `The Kamaiya system: bonded agricultural labor in the Terai lowlands. A Tharu family takes a loan from a landlord — for a wedding, a medical emergency, a bad harvest — and the debt is repaid in labor. The adult male works the landlord's fields. The debt accumulates interest. The labor does not repay it faster than the interest grows. The system is hereditary: the son inherits the debt. Nepal legally abolished the Kamaiya system in 2000, freeing 18,000 people formally. The freedom arrived without land or credit or alternative employment for most of them. The landlords who owned the debt-labor did not disappear. The freed Kamaiyas were now free to be landless in the Terai.`,
    choices: [
      {
        text: 'You are freed. The freedom is real. The alternatives are still being determined.',
        tag: null,
        outcome: 'The government gave some freed Kamaiyas small land plots in resettlement areas. Others found day labor. The debt system was replaced with landlessness and cash wages. The wages are, technically, yours to keep.',
        effect: (p) => {
          p.m += 5
          p.h -= 4
          p.r += 5
          p.addFlag('nep_dep_kamaiya_generation')
          p.setMem('nepDepKamaiya', true)
        },
      },
      {
        text: 'You leave before the abolition. The city is the alternative the Terai offers for those who run from the debt.',
        tag: null,
        outcome: 'The city is Kathmandu or Butwal or Bhairahawa and it has its own economy and its own hierarchies and you begin again with no connections and no capital and a body that knows agricultural labor.',
        effect: (p) => {
          p.r += 4
          p.mo -= 200
          p.addFlag('nep_dep_kamaiya_generation')
          p.addFlag('rural_urban_migrant')
          p.setMem('nepDepKamaiya', true)
        },
      },
    ],
    effect: null,
  },

  // ── MOUNTAIN PORTER LIFE ──────────────────────────────────────────────────

  {
    id: 'nep_dep_porter',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_NEPAL(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1970 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.nepDepPorter,
    text: `The trekking routes up to Everest base camp and through the Annapurna circuit generate an economy built on bodies. The porters carry loads that weigh between twenty-five and forty-five kilograms — trekking equipment, food supplies, expedition gear — in baskets on their backs suspended by tumplines across their foreheads. The daily rate is between ten and twenty dollars. The trekkers they carry for sometimes carry the same loads on training expeditions in other countries and get sponsorships. The distinction is clear on the trail but you do not spend time on the distinction. You carry because the carrying pays more than the farming, and the farming was what there was before.`,
    choices: [
      {
        text: 'You porter the routes for several seasons. The body learns the altitude.',
        tag: null,
        outcome: 'Your legs know the gradient at each stage. The altitude is information you process without thinking. The foreign trekkers photograph the landscape and you know the landscape as a series of loads and hours.',
        effect: (p) => {
          p.h += 4
          p.mo += 600
          p.addFlag('nep_dep_porter_generation')
          p.setMem('nepDepPorter', true)
        },
      },
      {
        text: 'You find a way to become a guide rather than a porter. The distinction is income and status.',
        tag: null,
        outcome: 'The guide speaks English and carries a radio and makes three times what the porter makes. The promotion requires English and connections. You had one of them. That was enough.',
        effect: (p) => {
          p.mo += 1200
          p.e += 3
          p.s += 2
          p.addFlag('nep_dep_porter_generation')
          p.setMem('nepDepPorter', true)
        },
      },
    ],
    effect: null,
  },

  // ── REMITTANCE HOUSEHOLD ──────────────────────────────────────────────────

  {
    id: 'nep_dep_remittance_child',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_NEPAL(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1990 && G.currentYear <= 2020 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.nepDepRemittanceChild,
    text: `Remittances from Nepali workers abroad are twenty-five to thirty percent of GDP. In the hill villages, the father's absence and the monthly transfer are the economic structure of the household. The money arrives through Western Union in the district town, and your mother goes on a certain day each month to collect it, and the household economy is organized around that day. Your father is in Qatar or Malaysia and calls when the phone signal allows. You know his voice before you know his face in three dimensions. The children who grow up in these households know the specific texture of a parent present by money transfer and absent in every other sense.`,
    choices: [
      {
        text: 'The money is enough. You go to school. That was the point of the absence.',
        tag: null,
        outcome: 'The school fees are paid and you go further in education than your parents did. Your father\'s absence is the investment. Whether it is worth what it cost is a calculation neither of you has finished making.',
        effect: (p) => {
          p.e += 4
          p.m -= 4
          p.r += 3
          p.addFlag('nep_dep_remittance_generation')
          p.setMem('nepDepRemittanceChild', true)
        },
      },
      {
        text: 'The money is enough but the absence is its own kind of poverty.',
        tag: null,
        outcome: 'The household functions. The function is incomplete. You will spend time later trying to understand what the absence means as a structural fact rather than a personal one.',
        effect: (p) => {
          p.m -= 7
          p.r += 5
          p.addFlag('nep_dep_remittance_generation')
          p.setMem('nepDepRemittanceChild', true)
        },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH: REMITTANCE GENERATION ADULT ───────────────────────────

  {
    id: 'nep_dep_remittance_adult',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_NEPAL(G) &&
      G.flags.has('nep_dep_remittance_generation') &&
      G.age >= 22 && G.age <= 35 &&
      !G.mem?.nepDepRemittanceAdult,
    text: `You are the right age now to go yourself. The logic that sent your father away is still operating. The work is in Qatar, in Malaysia, in South Korea — the same work, which is construction or manufacturing or care work, which requires a body and a visa and the ability to be where you are told. The recruiter takes a commission. The agency takes a commission. The employer in Qatar has the passport for the first six months until you establish yourself. This is the economy into which your schooling and your father's absence invested you.`,
    choices: [
      {
        text: 'You go. You understand now what your father understood and chose.',
        tag: null,
        outcome: 'The understanding doesn\'t dissolve the grief of it. It adds a different texture to the grief — the grief of understanding why the choice was made and making it again.',
        effect: (p) => {
          p.mo += 2000
          p.m -= 6
          p.r += 5
          p.addFlag('nepal_gulf_worker')
          p.addFlag('emigrated')
          p.setResidency('work_visa')
          p.setMem('nepDepRemittanceAdult', true)
        },
      },
      {
        text: 'You stay. The staying is also a choice, with its own costs.',
        tag: null,
        outcome: 'You find work in Kathmandu or in a trade in the district town. The income is lower. You are present for your own children. Both things are true and the exchange rate between them is not something you calculate neatly.',
        effect: (p) => {
          p.m += 3
          p.r += 3
          p.setMem('nepDepRemittanceAdult', true)
        },
      },
    ],
    effect: null,
  },

  // ── KUMARI: THE LIVING GODDESS ─────────────────────────────────────────────

  {
    id: 'nep_dep_kumari',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      IS_NEWAR(G) &&
      G.character.gender === 'female' &&
      G.currentYear >= 1950 && G.currentYear <= 2010 &&
      G.age >= 3 && G.age <= 8 &&
      !G.mem?.nepDepKumari,
    text: `The Kumari Devi is a prepubescent girl selected from the Shakya goldsmith caste of the Newar community to serve as the living manifestation of the goddess Taleju. The selection involves examination by astrologers, priests, and the state — the girl must have thirty-two physical perfections and must show no fear when confronted with the heads of sacrificed buffalo in a darkened room. Once selected she lives in the Kumari Ghar in Durbar Square, displayed at festivals, her feet never touching the ground, forbidden ordinary childhood activities. When she menstruates she returns to ordinary life. Former Kumaris are said to bring bad luck to the men who marry them, which affects their marriage prospects. The selection is happening in the city and it is possible you are being considered.`,
    choices: [
      {
        text: 'You are selected. For the next years your life belongs to the goddess and to the state.',
        tag: null,
        outcome: 'The ritual life is total. You see the city from a window and through the festivals. When it ends — when your body ends it — the return is a specific kind of difficulty. You have been divine. Ordinary life does not have instructions for coming back from that.',
        effect: (p) => {
          p.m -= 5
          p.r += 6
          p.karma += 5
          p.addFlag('nep_dep_kumari_witness')
          p.setMem('nepDepKumari', true)
        },
      },
      {
        text: 'You are not selected. The ordinary life continues.',
        tag: null,
        outcome: 'The girl who was selected lives in Durbar Square. You know her. The ordinary life you return to is what she returns to eventually. The knowledge of what she is doing sits alongside your ordinary life as a presence.',
        effect: (p) => {
          p.e += 2
          p.setMem('nepDepKumari', true)
        },
      },
    ],
    effect: null,
  },

  // ── PASHUPATINATH ─────────────────────────────────────────────────────────

  {
    id: 'nep_dep_pashupatinath',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_NEPAL(G) &&
      G.currentYear >= 1960 && G.currentYear <= 2020 &&
      G.age >= 12 && G.age <= 20 &&
      !G.mem?.nepDepPashupatinath,
    text: `The Bagmati River runs through Kathmandu and Pashupatinath Temple is on its banks, which is where the dead are brought. The cremation ghats are steps that descend to the river and the fires burn on them and the ashes go into the river. The river carries everything — the ash, the flower offerings, the water from the monsoon — and continues. This is not hidden. The cremations happen in the open, the smoke visible from the bridge where tourists sometimes stand with cameras. For you it is simply where the dead go. You have been coming here since childhood for festivals and for funerals and the relationship between the two has never been a contradiction.`,
    choices: null,
    effect: (p) => {
      p.r += 3
      p.karma += 2
      p.addFlag('nep_dep_pashupatinath')
      p.setMem('nepDepPashupatinath', true)
    },
  },

]

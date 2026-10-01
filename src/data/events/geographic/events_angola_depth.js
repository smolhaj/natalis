// events_angola_depth.js
// Angola depth: musseque life in Luanda (the unplanned settlement districts),
// the Ovimbundu rural displacement during the civil war, retornado departure in 1975,
// child soldier demobilisation (UNICEF/CCFA camps after 2002), mestiço identity
// under MPLA Marxist socialism, Angolan-Cuban cultural exchange, post-war demining,
// and the lived contrast of Luanda's oil wealth inequality.
// Companion to events_angola.js.

const IS_ANGOLA = (G) => G.character.country?.name === 'Angola'
const IS_OVIMBUNDU = (G) =>
  IS_ANGOLA(G) && G.character.ethnicity === 'ovimbundu'
const IS_URBAN_ANGOLA = (G) => IS_ANGOLA(G) && G.ruralUrban === 'urban'
const IS_RURAL_ANGOLA = (G) => IS_ANGOLA(G) && G.ruralUrban === 'rural'

export const ANGOLA_DEPTH_EVENTS = [

  // ── THE MUSSEQUE ─────────────────────────────────────────────────────────────

  {
    id: 'ang_dep_musseque_life',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_URBAN_ANGOLA(G) &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.angMusseque,
    text: `The musseque is the name for the unplanned neighbourhoods that ring Luanda — the sand streets, the zinc roofs, the water truck that comes on Wednesdays. The colonial city was built for the Portuguese; the musseque grew around it for everyone who came to work in it. The name comes from a Kimbundu word for sandy ground. You grow up in this geography: the central city with its pastel façades and colonnaded streets, which functions as a different country, and the musseque, which is where you are. The distinctions between them are very clear to anyone who lives on either side.`,
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.e += 2
      p.r += 2
      p.addFlag('ang_dep_musseque_generation')
      p.setMem('angMusseque', true)
    },
  },

  // ── RETORNADOS LEAVING 1975 ────────────────────────────────────────────────

  {
    id: 'ang_dep_retornados_1975',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_ANGOLA(G) &&
      G.currentYear >= 1974 && G.currentYear <= 1977 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.angRetornados,
    text: `The coup in Lisbon unravels the empire, and in 1975 the settlers leave, on planes, on ships, in cars driven to the port: furniture piled on the pavements, cars abandoned at the airport, shops and plantations suddenly empty. The Portuguese who ran the middle of the colony's economy are gone overnight. Independence is real, and the country has almost no one trained to run it, because the colonial system was built to make sure of that.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 5
      p.addFlag('ang_dep_retornado_departure')
      p.setMem('angRetornados', true)
    },
  },

  // ── OVIMBUNDU DISPLACEMENT ────────────────────────────────────────────────

  {
    id: 'ang_dep_ovimbundu_displacement',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_OVIMBUNDU(G) &&
      G.currentYear >= 1980 && G.currentYear <= 2000 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.angOvimbunduDisp,
    text: `The Ovimbundu are the largest ethnic group in Angola, concentrated in the central highlands — Bié, Huambo, Malanje. This is also UNITA territory. The war between MPLA and UNITA is not only an ideological war; it has ethnic geography. The MPLA is stronger among Ambundu speakers around Luanda and Mbundu speakers around Malanje; UNITA draws from the highlands. Being Ovimbundu in MPLA-controlled cities carries a weight that is never stated officially. You navigate this carefully, in small adjustments of what you say and to whom.`,
    choices: [
      {
        text: 'You have stayed in the highlands and lived with what the war brings to the highlands.',
        tag: null,
        outcome: 'The highlands have changed hands several times. The agricultural land that sustained your grandparents is mined or abandoned. What survived is what could be moved.',
        effect: (p) => {
          p.m -= 14
          p.h -= 4
          p.r += 9
          p.addFlag('ang_dep_ovimbundu_highlands')
          p.setMem('angOvimbunduDisp', true)
        },
      },
      {
        text: 'You came to Luanda, navigating the identity questions the city asks.',
        tag: null,
        outcome: 'Luanda knows what you are by the way you speak Kimbundu, or don\'t. The city absorbed you and filed you under a category you didn\'t choose.',
        effect: (p) => {
          p.m -= 8
          p.r += 6
          p.e += 2
          p.addFlag('ang_dep_ovimbundu_luanda')
          p.setMem('angOvimbunduDisp', true)
        },
      },
    ],
    effect: null,
  },

  // ── MESTIÇO IDENTITY UNDER MPLA SOCIALISM ─────────────────────────────────

  {
    id: 'ang_dep_mestizo_socialism',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_ANGOLA(G) &&
      G.character.ethnicity === 'mestico_angola' &&
      G.currentYear >= 1975 && G.currentYear <= 1992 &&
      G.age >= 16 &&
      !G.mem?.angMestizo,
    text: `The MPLA leadership in 1975 is disproportionately mestiço — the Angolans of mixed Portuguese and African descent who had access to colonial education, who read Marx in Lisbon, who networked through the anti-colonial movement in Lisbon and Paris. Independence is led, in large part, by people who look like you. This is a complicated position: the proximity to the colonial world that produced the revolution, the questions it generates from other Angolans, the kind of suspicion that attaches to those who benefited from colonial literacy while opposing colonial rule. You know all of this. It is the water you swim in.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 4
      p.addFlag('ang_dep_mestizo_generation')
      p.setMem('angMestizo', true)
    },
  },

  // ── CUBAN PRESENCE ────────────────────────────────────────────────────────

  {
    id: 'ang_dep_cuban_presence',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_ANGOLA(G) &&
      G.currentYear >= 1976 && G.currentYear <= 1991 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.angCubans,
    text: `The Cubans are here, tens of thousands of them, soldiers and technicians and doctors and teachers. They fight beside the MPLA against UNITA and South Africa, and they run clinics where there are no Angolan doctors. Your teacher may be Cuban; the doctor who delivered your brother may have been. They stay until 1991, and a whole generation grows up with Cubans as part of the landscape.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.r += 3
      p.addFlag('ang_dep_cuban_generation')
      p.setMem('angCubans', true)
    },
  },

  // ── CHILD SOLDIER DEMOBILISATION ──────────────────────────────────────────

  {
    id: 'ang_dep_child_soldier_demob',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_ANGOLA(G) &&
      G.currentYear >= 2002 && G.currentYear <= 2007 &&
      G.age >= 14 && G.age <= 24 &&
      G.flags.has('child_soldier_taken') &&
      !G.mem?.angDemob,
    text: `The war is over, and the demobilisation camp processes you: the gun onto a pile, civilian clothes for the uniform, a social worker with questions that have no good answers. The family tracing unit sometimes finds family, sometimes graves, sometimes nothing. The war that took you at whatever age it took you is over on paper. What it left in you is not.`,
    choices: [
      {
        text: 'Family was found.',
        tag: null,
        outcome: 'The reunion is real and also difficult in ways the social workers predicted but couldn\'t prepare you for. The person who left is not the same person who came back. The family absorbs this slowly.',
        effect: (p) => {
          p.m += 8
          p.r += 12
          p.h -= 3
          p.addFlag('ang_dep_demob_reunited')
          p.setMem('angDemob', true)
        },
      },
      {
        text: 'Family was not found.',
        tag: null,
        outcome: 'The vocational training gives you a skill. You build a life from the skill. The family-shaped absence stays in the room.',
        effect: (p) => {
          p.m -= 6
          p.r += 14
          p.h -= 5
          p.addFlag('ang_dep_demob_no_family')
          p.setMem('angDemob', true)
        },
      },
    ],
    effect: null,
  },

  // ── POST-WAR DEMINING ─────────────────────────────────────────────────────

  {
    id: 'ang_dep_demining',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_RURAL_ANGOLA(G) &&
      G.currentYear >= 2002 && G.currentYear <= 2015 &&
      G.age >= 25 &&
      !G.mem?.angDemine,
    text: `The deminers come to the district, men in orange helmets moving slowly across fields nobody has walked since the worst years, marking the mines with sticks and red tape. Over weeks the tape moves back across the land. When a field is formally cleared, people stand at the edge of the tape, and when it comes down they walk forward onto ground they have not walked on for twenty years. It is a small thing, and not small.`,
    choices: null,
    effect: (p) => {
      p.m += 5
      p.r += 6
      p.addFlag('ang_dep_demining_generation')
      p.setMem('angDemine', true)
    },
  },

  // ── OIL WEALTH CONTRAST IN LUANDA ─────────────────────────────────────────

  {
    id: 'ang_dep_luanda_inequality',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_URBAN_ANGOLA(G) &&
      G.currentYear >= 2005 && G.currentYear <= 2018 &&
      G.age >= 25 &&
      !G.mem?.angLuandaIneq,
    text: `Luanda is the most expensive city on earth for foreigners two years running. A two-bedroom flat with a generator costs what it costs in London, and the supermarkets in Miramar sell French cheese. In the musseques the water truck comes when it comes. The generation that fought for independence lives in the villas on the ridge, and their children studied in Lisbon. The cranes on the Marginal are building for someone who is not you.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 7
      p.addFlag('ang_dep_oil_inequality')
      p.setMem('angLuandaIneq', true)
    },
  },

  // ── PORTUGUESE LANGUAGE IDENTITY ─────────────────────────────────────────

  {
    id: 'ang_dep_portuguese_language',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_ANGOLA(G) &&
      G.currentYear >= 1975 && G.currentYear <= 2000 &&
      G.age >= 12 && G.age <= 20 &&
      !G.mem?.angPortLang,
    text: `Portuguese is the national language — the colonial tongue that became the lingua franca of a country with over forty Bantu languages. In the musseques and rural areas people speak Kimbundu, Kikongo, Umbundu, Chokwe. At school, in the MPLA party meetings, in the newspapers and radio broadcasts, everything is Portuguese. Your identity runs through two linguistic tracks simultaneously: the language of home, which carries what home holds, and the language of the public world, which is the colonial language repurposed for independence. You switch between them dozens of times a day without thinking about it. Only when someone asks do you realise the switching has a name.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 3
      p.addFlag('ang_dep_portuguese_bilingual')
      p.setMem('angPortLang', true)
    },
  },

]

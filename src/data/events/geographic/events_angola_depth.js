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
    phase: 'childhood',
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
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_ANGOLA(G) &&
      G.currentYear >= 1974 && G.currentYear <= 1977 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.angRetornados,
    text: `In 1974 the Portuguese coup happens and the empire unravels. By 1975, 300,000 Portuguese settlers are leaving Angola — on planes, on ships, in cars driven to the port. The retornados take what they can carry and leave the rest. Furniture piled on pavements. Cars abandoned at the airport. The apartments and the shops and the plantations are suddenly empty. The economy the colony ran on — the Portuguese in the middle — is gone overnight. Independence is real and the country has almost no one trained to run it, because the colonial system was designed to prevent exactly that.`,
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
    phase: 'young_adult',
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_ANGOLA(G) &&
      G.character.ethnicity === 'mestico_angola' &&
      G.currentYear >= 1975 && G.currentYear <= 1992 &&
      G.age >= 16 &&
      !G.mem?.angMestizo,
    text: `The MPLA leadership in 1975 is disproportionately mestiço — the Angolans of mixed Portuguese and African descent who had access to colonial education, who read Marx in Lisbon, who networked through the anti-colonial movement in Lisbon and Paris. Independence is led, in large part, by people who look like you. This is a complicated position: the proximity to the colonial world that produced the revolution, the questions it generates from other Angolans, the particular kind of suspicion that attaches to those who benefited from colonial literacy while opposing colonial rule. You know all of this. It is the water you swim in.`,
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
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_ANGOLA(G) &&
      G.currentYear >= 1976 && G.currentYear <= 1991 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.angCubans,
    text: `The Cubans are here — 30,000 to 50,000 of them at the peak, soldiers and technicians and doctors and teachers. They fight alongside the MPLA against UNITA and South Africa. They also run clinics in areas that have no Angolan doctors. Your school may have a Cuban teacher. The doctor who delivered your sibling may have been Cuban. The Cuban presence is military and also medical and also educational, which produces a texture that is different from other foreign military presences. They will be here until 1991. By the time they leave, an entire generation has grown up knowing Cubans as part of the landscape.`,
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_ANGOLA(G) &&
      G.currentYear >= 2002 && G.currentYear <= 2007 &&
      G.age >= 14 && G.age <= 24 &&
      G.flags.has('child_soldier_recruited') &&
      !G.mem?.angDemob,
    text: `The war is over. The UNICEF demobilisation camps run transit programmes — disarmament, counselling, family tracing, vocational training. You are processed through the system: the gun goes into a pile, the uniform is replaced with civilian clothes, a social worker asks you questions that have no good answers. The family tracing unit sometimes finds family. Sometimes it finds graves. Sometimes it finds nothing. The war that recruited you at — what age? — is over on paper. What it left in you is not on paper.`,
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_RURAL_ANGOLA(G) &&
      G.currentYear >= 2002 && G.currentYear <= 2015 &&
      G.age >= 25 &&
      !G.mem?.angDemine,
    text: `The deminers come to the district. Men in orange helmets with metal detectors, moving slowly across fields that have not been walked since the war's worst years. They mark the mines with sticks and red tape. Over days and weeks the red tape moves back across the land. When a field is cleared — formally cleared, with the paperwork — it is an event. People stand at the edge of the red tape and, when it comes down, walk forward onto ground they have not walked on for twenty years. The land has been returned. The gesture of walking onto it is small and not small.`,
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_URBAN_ANGOLA(G) &&
      G.currentYear >= 2005 && G.currentYear <= 2018 &&
      G.age >= 25 &&
      !G.mem?.angLuandaIneq,
    text: `Luanda has been ranked the world's most expensive city for expatriate workers two years running. A two-bedroom apartment in a building with a generator costs what it costs in London. The supermarkets in Miramar sell French cheese and Portuguese wine. Outside, in the musseques, the water truck comes when it comes. The contrast is not hidden — it is the texture of the city. The MPLA generation that fought for independence is now in the villas on the ridge. Their children went to Lisbon for university. The construction cranes on the Marginal are building for someone who is not you.`,
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

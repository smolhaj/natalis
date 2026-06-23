// events_sudan_depth.js
// Sudan depth: Khartoum's two Niles, haboob dust seasons, the Nuba Mountains
// bombing campaign 1992–2002, ghost house disappearances under Bashir, Fur and
// Masalit life in western Sudan before the Darfur crisis, the 2019–2021
// transitional government as lived hope, the sittaat al-shay (tea ladies) as
// political and social institution, and the Arab-African identity question.
// Companion to events_sudan.js.

const IS_SUDAN = (G) => G.character.country?.name === 'Sudan'
const IS_URBAN_SUDAN = (G) => IS_SUDAN(G) && G.ruralUrban === 'urban'
const IS_NUBA = (G) => IS_SUDAN(G) && G.character.ethnicity === 'nuba'
const IS_FUR = (G) => IS_SUDAN(G) && G.character.ethnicity === 'fur'
const IS_MASALIT = (G) => IS_SUDAN(G) && G.character.ethnicity === 'masalit'

export const SUDAN_DEPTH_EVENTS = [

  // ── THE TWO NILES ─────────────────────────────────────────────────────────

  {
    id: 'sdn_dep_two_niles',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_URBAN_SUDAN(G) &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.sdnTwoNiles,
    text: `The city where you live is built at the confluence. The Blue Nile comes from the Ethiopian highlands, carrying silt from the monsoon rains, running dark and fast in season. The White Nile comes from the lake systems of Central Africa, slower and steadier. They meet here, at Khartoum, and for a stretch they run side by side without fully mixing — you can see the line between the two waters from the bridges. Every child in Khartoum learns this geography early. The two Niles and where they meet: this is what the city is, physically. Everything else about Khartoum is built on top of this fact.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.m += 3
      p.addFlag('sdn_dep_nile_khartoum')
      p.setMem('sdnTwoNiles', true)
    },
  },

  // ── THE HABOOB ────────────────────────────────────────────────────────────

  {
    id: 'sdn_dep_haboob',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_SUDAN(G) &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.sdnHaboob,
    text: `The haboob arrives without much warning — a wall of dust, sometimes three thousand metres high, that moves across the desert and swallows the city. The sky goes brown and then orange and then dark. You have minutes to get inside, close the shutters, press rags into the door gaps. When it passes — and it passes; the sky clears completely and the light goes sharp and clean — everything is coated in fine dust. Furniture, food, the water in open containers, your lungs. In Khartoum the haboob season runs with the heat months, a yearly companion. You learn to read the sky the way other children in other places learn to read rain.`,
    choices: null,
    effect: (p) => {
      p.m += 2
      p.e += 2
      p.addFlag('sdn_dep_haboob_child')
      p.setMem('sdnHaboob', true)
    },
  },

  // ── NUBA MOUNTAINS BOMBING ─────────────────────────────────────────────────

  {
    id: 'sdn_dep_nuba_bombing',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_NUBA(G) &&
      G.currentYear >= 1992 && G.currentYear <= 2005 &&
      G.age >= 14 && G.age <= 40 &&
      !G.mem?.sdnNubaB,
    text: `The Nuba Mountains are in South Kordofan. The SPLA has support here. The government's response to the insurgency is systematic: Antonov bombers fly over civilian areas and drop barrel bombs. They fall on markets, on schools, on water sources. There is no air-raid warning system because no one anticipated the government would bomb its own people with enough regularity to need one. The crops are burned. The cattle are shot. The aid organisations are expelled in 1992 so that what is happening cannot be observed. Between 1992 and 2002 an estimated 200,000 Nuba die. The international press does not cover it. The word genocide is not applied.`,
    choices: [
      {
        text: 'You leave the mountains — toward Khartoum or SPLA-controlled territory.',
        tag: null,
        outcome: 'The road out is also dangerous. What you reach is safer than what you left. The mountains stay inside you as the place the bombing happened.',
        effect: (p) => {
          p.m -= 18
          p.h -= 6
          p.r += 12
          p.addFlag('sdn_dep_nuba_generation')
          p.setMem('sdnNubaB', true)
        },
      },
      {
        text: 'You remain, underground where possible, living with the sound.',
        tag: null,
        outcome: 'The people who stayed developed knowledge — of shelter, of sound, of the Antonov\'s engine at the distance that means move. This knowledge is also a cost.',
        effect: (p) => {
          p.m -= 22
          p.h -= 8
          p.r += 15
          p.addFlag('sdn_dep_nuba_generation')
          p.setMem('sdnNubaB', true)
        },
      },
    ],
    effect: null,
  },

  // ── GHOST HOUSE DISAPPEARANCE ─────────────────────────────────────────────

  {
    id: 'sdn_dep_ghost_house_dread',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_SUDAN(G) &&
      G.currentYear >= 1990 && G.currentYear <= 2019 &&
      G.age >= 18 && G.age <= 50 &&
      G.flags.has('sudan_bashir_generation') &&
      !G.mem?.sdnGhostHouse,
    text: `Someone you know disappears. Not into prison — into the other system, the one that has no address. The ghost houses are unofficial detention centres scattered across Khartoum, run by the National Intelligence and Security Service. They do not officially exist. The torture that happens inside them is not officially documented. When someone is taken, the family is not informed. They find out through the informal networks that exist precisely for this purpose — the calls made at specific hours, the names whispered, the coordinates passed person to person. Sometimes people come back. Sometimes they do not. Afterwards, you modify your behaviour in ways you do not fully name as modification.`,
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.r += 8
      p.addFlag('sdn_dep_ghost_house_era')
      p.setMem('sdnGhostHouse', true)
    },
  },

  // ── FUR LIFE IN WESTERN SUDAN ─────────────────────────────────────────────

  {
    id: 'sdn_dep_fur_land',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_FUR(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2000 &&
      G.age >= 5 && G.age <= 18 &&
      !G.mem?.sdnFurLand,
    text: `The Fur are the people of Jebel Marra — the volcanic massif in central Darfur that rises to 3,000 metres above the surrounding desert. The millet grows here where it cannot grow in the flat country below. The water sources are different. The seasonal markets that run from highland to lowland along ancient trade routes are the calendar of the year. The Fur Sultanate is in the history books but is also alive in the village structure, the genealogies, the authority of certain elders. Growing up here is growing up in a specific geography with a specific memory. Khartoum is a distant fact. The centre of the country is somewhere else.`,
    choices: null,
    effect: (p) => {
      p.m += 3
      p.e += 2
      p.r += 2
      p.addFlag('sdn_dep_fur_highlands')
      p.setMem('sdnFurLand', true)
    },
  },

  // ── MASALIT VILLAGE LIFE ──────────────────────────────────────────────────

  {
    id: 'sdn_dep_masalit_life',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_MASALIT(G) &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 5 && G.age <= 18 &&
      !G.mem?.sdnMasalit,
    text: `The Masalit live in the area around Geneina, near the Chad border — a flat semi-arid country where the millet and sorghum farming depends on rains that arrive in July and fail in September. Your father knows which years the rains came and which they did not, going back before his grandfather. The village is also a trading point; the trans-Saharan routes pass through here, and people come through with camels and cattle and news from Chad and Libya. The Masalit sultanate existed until the British and the Sudanese government dismantled its formal structure. The informal one remains. You grow up inside it without knowing it as anything other than the way things are.`,
    choices: null,
    effect: (p) => {
      p.m += 2
      p.e += 2
      p.r += 2
      p.addFlag('sdn_dep_masalit_generation')
      p.setMem('sdnMasalit', true)
    },
  },

  // ── THE 2019–2021 TRANSITION ──────────────────────────────────────────────

  {
    id: 'sdn_dep_transition_hope',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_SUDAN(G) &&
      G.currentYear >= 2019 && G.currentYear <= 2021 &&
      G.age >= 18 &&
      G.flags.has('sudan_revolution_generation') &&
      !G.mem?.sdnTransition,
    text: `The twenty-six months between Bashir's fall in April 2019 and the coup in October 2021 have a distinct quality you will remember as a specific period. The prime minister is a civilian — an economist who worked at the IMF and came back. There are women in the cabinet. The ghost houses begin to be officially investigated. The names of people who disappeared are read out in formal proceedings. Sudan is removed from the US list of state sponsors of terrorism. The IMF negotiates debt relief. The speed of change is not fast enough for the protesters and too fast for the military. You know now that the military was never genuinely sharing power. In the moment, there was something that was not false.`,
    choices: [
      {
        text: 'You invested in it — stayed, worked, built something for the new Sudan.',
        tag: null,
        outcome: 'The coup takes this specifically. The October 25th dissolution is not an abstraction. It is a list of things you personally built, closed.',
        effect: (p) => {
          p.m -= 15
          p.r += 12
          p.karma += 5
          p.addFlag('sdn_dep_transition_generation')
          p.setMem('sdnTransition', true)
        },
      },
      {
        text: 'You watched it carefully, not wanting to be wrong again.',
        tag: null,
        outcome: 'The caution was also a cost. What you protected yourself from was the hope. When the coup came, you were correct. You found that correctness painful.',
        effect: (p) => {
          p.m -= 10
          p.r += 9
          p.addFlag('sdn_dep_transition_generation')
          p.setMem('sdnTransition', true)
        },
      },
    ],
    effect: null,
  },

  // ── THE SITTAAT AL-SHAY ───────────────────────────────────────────────────

  {
    id: 'sdn_dep_tea_ladies',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_SUDAN(G) &&
      G.age >= 18 && G.age <= 50 &&
      !G.mem?.sdnTeaLadies,
    text: `The sittaat al-shay — the tea ladies — are on every street corner in Khartoum. A charcoal burner, a kettle, a low plastic table, a handful of glasses. They pour attaya — strong tea with mint, with milk, in a specific rhythm that is also a kind of ceremony. The tea ladies are almost always women. They are in the informal economy, unlicensed, paying informal taxes to the police in small daily payments. During the 2019 revolution, they became something else: they ran the sit-in. They cooked for the hundreds of thousands camping outside the military headquarters. They used their earnings and their networks to supply the protest. When the RSF moved on the camp on June 3, some of them died at their stations. The tea is not separate from the politics.`,
    choices: null,
    effect: (p) => {
      p.m += 4
      p.e += 2
      p.addFlag('sdn_dep_sittat_al_shay')
      p.setMem('sdnTeaLadies', true)
    },
  },

  // ── THE ARAB-AFRICAN IDENTITY QUESTION ────────────────────────────────────

  {
    id: 'sdn_dep_arab_african',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_SUDAN(G) &&
      G.age >= 13 && G.age <= 25 &&
      !G.mem?.sdnArabAfrican,
    text: `Sudan sits at a border that is not on maps: between the Arab world and sub-Saharan Africa. The government's Arabisation policy from the 1980s onward — the promotion of Arabic and Islam as the national identity, the suppression of other languages, of southern Christian and animist traditions — was also a claim about what kind of place Sudan was. For you, the question is personal: in Cairo you are African. In Lagos you are Arab. In Khartoum you are whatever the politics of the moment requires. The census categories have changed several times in your lifetime. Your identity has been a political question without becoming any less personal. The word Sudanese contains a conflict that has never been resolved by simply using it.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.addFlag('sdn_dep_arab_african_identity')
      p.setMem('sdnArabAfrican', true)
    },
  },

]

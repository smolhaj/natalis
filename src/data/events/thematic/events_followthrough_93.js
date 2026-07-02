// Follow-through events for Cameroon depth arc
// Covers: cmr_oil_generation, cmr_boko_north_witness,
// cmr_kondengui_witness, cmr_ghost_town_generation

const IS_CAMEROONIAN = (G) => G.character.country?.name === 'Cameroon'

export const FOLLOWTHROUGH_93_EVENTS = [

  {
    id: 'ft93_oil_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.flags.has('cmr_oil_generation') &&
      G.age >= 55 &&
      !G.mem?.ft93Oil,
    text: 'The oil is almost gone. The fields that came online in 1977 are depleted; the offshore exploration has found less than hoped. What the oil funded — the presidency, the ministries, the structural adjustment that was supposed to modernize the rest — is now visible in the gap between what the oil years promised and what the post-oil years contain. The standard comparison is Norway, which managed its oil for future generations. The comparison is unfair and also the comparison you make when you want to understand where the decades went.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft93Oil', true) },
  },

  {
    id: 'ft93_boko_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.flags.has('cmr_boko_north_witness') &&
      G.age >= 55 &&
      !G.mem?.ft93Boko,
    text: 'The Boko Haram raids on the far north have continued for more than a decade. The Lake Chad basin is one of the fastest-drying regions on earth; the lake has lost ninety percent of its surface area since 1963. The fishing communities that the lake supported are gone. The herding routes that the water sustained are gone. The recruits for armed groups are partly produced by the disappearance of the lake, which is not in the Boko Haram analysis but is in the landscape. You know this because you have watched the landscape.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.setMem('ft93Boko', true) },
  },

  {
    id: 'ft93_kondengui_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.flags.has('cmr_kondengui_witness') &&
      G.age >= 55 &&
      !G.mem?.ft93Kondengui,
    text: 'The person you knew came out. Others did not. The overcrowding at Kondengui is in the human rights reports and the reports are accurate and the prison continues. The system that put people in without charge and held them for years was not reformed after Biya\'s presidency ended, because Biya\'s presidency has not ended. The reform that would require the president to stop using detention as an instrument of political management requires a president with different instruments. You have thought about this for a long time. You have arrived at no conclusion that changes the situation.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft93Kondengui', true) },
  },

  {
    id: 'ft93_ghost_town_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.flags.has('cmr_ghost_town_generation') &&
      G.age >= 55 &&
      !G.mem?.ft93Ghost,
    text: 'Monday is still Monday. The crisis has no resolution framework — no talks, no ceasefire, no plan. The Amba Boys have factionalized; some factions accept that independence is no longer achievable and are waiting for an exit; others continue. The children who lost six or seven years of school during the boycott years are now adults who carry a specific gap in their formation. The generation defined by the school boycott is not abstract. They are in the town. You know them. The gap is theirs and it is also the resolution of the question: what does a ghost town cost?',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft93Ghost', true) },
  },

]

// Follow-through events for Laos depth arc
// Covers: laos_seminar_camp_kin, laos_sombath_era, laos_hmong_return_era,
// and combined laos_china_era + laos_dam_generation late reckoning

const IS_LAOTIAN = (G) => G.character.country?.name === 'Laos'

export const FOLLOWTHROUGH_94_EVENTS = [

  {
    id: 'ft94_seminar_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.flags.has('laos_seminar_camp_kin') &&
      G.age >= 55 &&
      !G.mem?.ft94Seminar,
    text: 'You never knew the full account. The version that came back with him was compressed — the work, the meetings, the self-criticism sessions, the conditions — into something that could be managed by being mentioned briefly and then not mentioned again. The people who were in the camps and died there were not officially acknowledged for decades. The people who came back changed and then died of age carrying the changed versions of themselves — their accounts went with them. You are now old enough to understand that the historical record of what happened in those camps is primarily the record of what the survivors agreed to share, which was not everything. The rest is in the silences you grew up around.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft94Seminar', true) },
  },

  {
    id: 'ft94_sombath_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.flags.has('laos_sombath_era') &&
      G.age >= 55 &&
      !G.mem?.ft94Sombath,
    text: 'The investigation into Sombath Somphone\'s disappearance is still open. His wife, Shui Meng, has continued to ask publicly for information that has not been provided. The government\'s responses have remained consistent in form: the investigation continues. You have watched this for more than a decade. The specific lesson about what is available to a person who asks the government directly for accountability, in public, in this country — you carry that lesson. It is not a lesson that produces conclusions. It is a lesson that adjusts what you expect from the mechanisms you used to expect more from.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.setMem('ft94Sombath', true) },
  },

  {
    id: 'ft94_hmong_return_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.flags.has('laos_hmong_return_era') &&
      G.age >= 55 &&
      !G.mem?.ft94HmongReturn,
    text: 'The families who came back in 2009 are a generation that belongs to two places without fully belonging to either. The children who grew up in Huay Nam Khao camp are now adults who grew up in Laos after 2009. The ones who ended up in Minnesota or France or Australia represent a different branch. You know people from all three branches. The common thread is a specific knowledge about what it costs to be a Hmong who requires the protection of a state that has reasons to find Hmong protection inconvenient. The knowledge does not produce bitterness in everyone. In some it produces a specific kind of competence: they know how to manage without expecting much from the structures around them.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft94HmongReturn', true) },
  },

  {
    id: 'ft94_battery_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.flags.has('laos_china_era') &&
      G.flags.has('laos_dam_generation') &&
      G.age >= 60 &&
      !G.mem?.ft94Battery,
    text: 'Laos sold itself as the Battery of Southeast Asia — the rivers into electricity into money. The electricity went to Thailand and China and Vietnam at prices set in long-term contracts. The debt for the dams was mostly owed to Chinese banks, which now manage the national electricity grid under a fifty-year concession. The river the fishermen were born on has lower dry-season flows than it had when you were young. The fish catch is down across the basin. The economic logic held: the electricity revenues are real. The river that sustained communities for centuries is also real, and it has changed. Both of those things are the Battery of Southeast Asia.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.setMem('ft94Battery', true) },
  },

]

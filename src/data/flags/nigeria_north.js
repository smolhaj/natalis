/**
 * NIGERIA_NORTH_FLAGS — flags for events_nigeria_north.js: northern and
 * Middle Belt Nigerian lives (Kano, Borno, Benue). Each is consumed by an
 * `nn_ft_*` follow-through in that module.
 */
export const NIGERIA_NORTH_FLAGS = {

  nn_allo_school: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Went to the makarantar allo, the Qur\'anic slate school, as a northern Muslim child.',
    notes: 'Follow-through: nn_ft_allo, hearing your own child recite the same verse.',
  },
  nn_almajiri: {
    weight: 'major', category: 'identity', intent: 'event',
    description: 'Was given to a malam as an almajiri boy, living by recitation and the begging bowl.',
    notes: 'Follow-through: nn_ft_almajiri_gate (boys at your gate), nn_ft_almajiri_2020 (the Covid lorries).',
  },
  nn_tray_child: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Carried a secluded mother\'s trade through the Kano lanes on a tray as a child.',
    notes: 'Follow-through: nn_ft_tray.',
  },
  nn_sardauna_1966: {
    weight: 'moderate', category: 'historical', intent: 'event',
    description: 'Lived through the killing of the Sardauna in January 1966 and the July counter-coup from the north or the Middle Belt.',
    notes: 'Follow-through: nn_ft_sardauna, the faded picture in the tailor\'s shop.',
  },
  nn_upe_1976: {
    weight: 'moderate', category: 'historical', intent: 'event',
    description: 'Saw Universal Primary Education arrive in the north in 1976.',
    notes: 'Follow-through: nn_ft_upe, the same school decaying.',
  },
  nn_kulle: {
    weight: 'major', category: 'identity', intent: 'event',
    description: 'Lived in kulle, the seclusion of married women, in Kano.',
    notes: 'Follow-through: nn_ft_kulle, reading nn_kulle_trade for the branch.',
  },
  nn_kulle_trade: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Ran a trade from inside the compound through children while in kulle.',
    notes: 'Read by nn_ft_kulle.',
  },
  nn_maitatsine: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived through a Maitatsine rising: Kano 1980, Bulumkutu 1982, or heard Yola 1984 and Gombe 1985 from Borno.',
    notes: 'Follow-through: nn_ft_maitatsine, 2009, "it is Maitatsine again".',
  },
  nn_lake_chad: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Fished or farmed the retreating shore of Lake Chad as a Kanuri.',
    notes: 'Follow-through: nn_ft_lake, pointing at where the water was.',
  },
  nn_sharia_2000: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Lived through the adoption of Sharia penal law in the northern states, 2000-01.',
    notes: 'Follow-through: nn_ft_hisbah, the hisbah on the Kano street.',
  },
  nn_polio_accepted: {
    weight: 'moderate', category: 'health', intent: 'event',
    description: 'Let the polio vaccinators in during the Kano boycott of 2003-04.',
    notes: 'Follow-through: nn_ft_polio (2020, wild-polio-free).',
  },
  nn_polio_refused: {
    weight: 'moderate', category: 'health', intent: 'event',
    description: 'Kept a child from the polio vaccinators during the Kano boycott of 2003-04.',
    notes: 'Follow-through: nn_ft_polio (2020, wild-polio-free).',
  },
  nn_yusuf_2009: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Was in Borno for the Maiduguri fighting of July 2009 and the killing of Mohammed Yusuf.',
    notes: 'Follow-through: nn_ft_yusuf, the boys from the street.',
  },
  nn_kano_2012: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Was in Kano for the coordinated bombings of 20 January 2012.',
    notes: 'Follow-through: nn_ft_kano_bombs.',
  },
  nn_kano_mosque_2014: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Was in Kano for the bombing of the Central Mosque at Friday prayers, 28 November 2014.',
    notes: 'Follow-through: nn_ft_kano_bombs.',
  },
  nn_civilian_jtf: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Stood with the Civilian JTF in Maiduguri, 2013-14.',
    notes: 'Follow-through: nn_ft_cjtf, the woman in the market.',
  },
  nn_chibok_2014: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Was in Borno when the Chibok schoolgirls were taken in April 2014.',
    notes: 'Follow-through: nn_ft_chibok, the releases of 2016 and 2017.',
  },
  nn_idp_camp: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Fled a Borno village to a Maiduguri IDP camp, 2014-15.',
    notes: 'Follow-through: nn_ft_idp, the liberated local government nobody can farm.',
  },
  nn_alhaji: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Made the Hajj from the north and came back Alhaji or Hajiya.',
    notes: 'Follow-through: nn_ft_alhaji, the title replacing the name.',
  },
  nn_tiv_riots: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Lived through the Tiv riots of 1964 against the Northern government.',
    notes: 'Follow-through: nn_ft_benue_farm.',
  },
  nn_federal_soldier: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Went to the civil war as a Tiv federal infantryman, 1967-70.',
    notes: 'Follow-through: nn_ft_tiv_soldier, the pension bench in Makurdi.',
  },
  nn_middle_belt_minority: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Tiv or Idoma in Benue, outside the Hausa-Yoruba-Igbo frame.',
    notes: 'Follow-through: nn_ft_three_nations, the state-of-origin box.',
  },
  nn_tiv_jukun: {
    weight: 'moderate', category: 'conflict', intent: 'event',
    description: 'Lived through the Tiv-Jukun clashes of 1991-92 from Benue.',
    notes: 'Follow-through: nn_ft_benue_farm.',
  },
  nn_zaki_biam: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived in Benue when the army razed Zaki Biam in October 2001.',
    notes: 'Follow-through: nn_ft_benue_farm.',
  },
  nn_agatu_2016: {
    weight: 'moderate', category: 'conflict', intent: 'event',
    description: 'Lived in Benue during the Agatu killings of February 2016.',
    notes: 'Follow-through: nn_ft_benue_farm.',
  },
  nn_benue_2018: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived in Benue for the New Year killings of 2018 and the Makurdi mass burial.',
    notes: 'Follow-through: nn_ft_benue_farm.',
  },
}

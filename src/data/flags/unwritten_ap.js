/**
 * UNWRITTEN_AP_FLAGS — flags for events_unwritten_asia_pacific.js: the Ngalop
 * of Bhutan, three of Papua New Guinea's regional populations (southern Papuan
 * coast, Momase, Islands and Bougainville), the Bisaya of the Philippines and
 * the Khmu of Laos — groups `unwritten-group` found no guard had ever named.
 *
 * Every flag here is consumed by a follow-through event in the same module.
 */
export const UNWRITTEN_AP_FLAGS = {

  // ── Bhutan: Ngalop
  uap_ngl_first_road: {
    weight: 'moderate', category: 'historical', intent: 'event',
    description: 'Was a child in the western valleys when the first road and the first truck arrived, 1962–66.',
    notes: 'Set by uap_ngl_road_1962. Consumed by uap_ngl_ft_road.',
  },
  uap_ngl_code_1989: {
    weight: 'major', category: 'historical', intent: 'event',
    description: 'Was inside the majority when the 1989 dress and etiquette code was made compulsory, and watched it land on a southern neighbour.',
    notes: 'Set by uap_ngl_driglam_1989. Consumed by uap_ngl_ft_code, when the Lhotshampa resettlement flights begin in 2008.',
  },

  // ── Papua New Guinea: southern Papuan coast
  uap_pap_war_1942: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Conscripted as a carrier on the Kokoda Track, or evacuated inland from the Port Moresby harbour villages, in 1942.',
    notes: 'Set by uap_pap_war_1942. Consumed by uap_pap_ft_war.',
  },
  uap_pap_independence_1975: {
    weight: 'moderate', category: 'historical', intent: 'event',
    description: 'Was at Waigani on 16 September 1975, on land a Motu-Koita family says was theirs.',
    notes: 'Set by uap_pap_independence_1975. Consumed by uap_pap_ft_settlement.',
  },

  // ── Papua New Guinea: Momase
  uap_mom_occupation: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived through the Japanese occupation of the northern coast and the Allied bombing, 1942–44.',
    notes: 'Set by uap_mom_occupation. Consumed by uap_mom_ft_bones.',
  },
  uap_mom_crocodile_marks: {
    weight: 'moderate', category: 'cultural', intent: 'event',
    description: 'Went through Sepik initiation in the haus tambaran and carries the crocodile scarification.',
    notes: 'Set by uap_mom_crocodile. Consumed by uap_mom_ft_crocodile.',
  },
  uap_mom_refused_cutting: {
    weight: 'moderate', category: 'cultural', intent: 'event',
    description: 'Stayed at the mission school instead of going into the haus tambaran with the other boys.',
    notes: 'Set by uap_mom_crocodile. Consumed by uap_mom_ft_crocodile.',
  },

  // ── Papua New Guinea: Bougainville
  uap_bou_panguna: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Saw the Panguna mine take the valley and the Jaba River, 1969–74.',
    notes: 'Set by uap_bou_panguna. Consumed by uap_bou_ft_pit.',
  },
  uap_bou_blockade: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived through the PNG blockade of Bougainville in the 1990s, in the mountains or in a care centre.',
    notes: 'Set by uap_bou_blockade. Consumed by uap_bou_ft_referendum (2019).',
  },

  // ── Philippines: Bisaya
  uap_bis_fined_language: {
    weight: 'moderate', category: 'cultural', intent: 'event',
    description: 'Was fined at school for speaking Bisaya.',
    notes: 'Set by uap_bis_speak_english. Consumed by uap_bis_ft_mother_tongue (MTB-MLE, 2012–23).',
  },
  uap_bis_yolanda: {
    weight: 'major', category: 'disaster', intent: 'event',
    description: 'Had family in Tacloban when Typhoon Haiyan (Yolanda) struck in November 2013.',
    notes: 'Set by uap_bis_yolanda. Consumed by uap_bis_ft_yolanda.',
  },

  // ── Laos: Khmu
  uap_khmu_bombing: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived through the American bombing of the northern uplands, 1965–73, farming at night.',
    notes: 'Set by uap_khmu_bombing. Consumed by uap_khmu_ft_bombie.',
  },
  uap_khmu_relocated: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Went down with the village when it was resettled to a roadside focal site.',
    notes: 'Set by uap_khmu_relocation. Consumed by uap_khmu_ft_relocation.',
  },
  uap_khmu_stayed_up: {
    weight: 'moderate', category: 'displacement', intent: 'event',
    description: 'Stayed on the mountain with the old people when the village was resettled.',
    notes: 'Set by uap_khmu_relocation. Consumed by uap_khmu_ft_relocation.',
  },
}

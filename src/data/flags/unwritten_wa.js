/**
 * UNWRITTEN_WA_FLAGS — flags for events_unwritten_west_africa.js: the Kabye
 * of Togo, the Zarma-Songhai and Tuareg of Niger, the Susu of Guinea, the
 * Burkinabè and Malian families of Ivory Coast, and Algeria's Chaoui and
 * Mozabites. Each is consumed by a `uwa_ft_*` follow-through in that module.
 */
export const UNWRITTEN_WA_FLAGS = {

  uwa_kby_evala_wrestled: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Wrestled in evala, the Kabye initiation, in the Kara region in July.',
    notes: 'Follow-through: uwa_ft_kby_evala, standing at the ring as an elder (45+).',
  },
  uwa_kby_2005_witness: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived through the succession and post-election violence of 2005 in Togo as a Kabye.',
    notes: 'Follow-through: uwa_ft_kby_2017, the 2017 protests led from the north.',
  },
  uwa_zrm_drought_1973: {
    weight: 'major', category: 'historical', intent: 'event',
    description: 'Lived through the 1973-74 Sahel drought and Kountché\'s coup in Niger.',
    notes: 'Follow-through: uwa_ft_zrm_1984, the second drought.',
  },
  uwa_tua_tchin_1990: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'A Tuareg family touched by the Tchin-Tabaradene reprisals of May 1990.',
    notes: 'Follow-through: uwa_ft_tua_2007, the MNJ rising of 2007-09.',
  },
  uwa_susu_market_1977: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Was among the Conakry market women in the revolt of 27 August 1977.',
    notes: 'Follow-through: uwa_ft_susu_market, telling the younger stallholders.',
  },
  uwa_susu_conte_1984: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'A Susu who saw Lansana Conté, one of their own, take power in April 1984.',
    notes: 'Follow-through: uwa_ft_susu_2007, the general strike against the same man.',
  },
  uwa_mwa_cocoa_child: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Grew up on a cocoa plantation cleared by a father from Upper Volta or Mali.',
    notes: 'Follow-through: uwa_ft_mwa_land, the 1998 land law and Tabou.',
  },
  uwa_mwa_2002_war: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'A Burkinabè or Malian family in Ivory Coast when the 2002 war made foreigners suspects.',
    notes: 'Follow-through: uwa_ft_mwa_2011, Ouattara and the 2013 nationality law.',
  },
  uwa_ber_aures_1954: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'A Chaoui child in the Aurès on 1 November 1954 and the months after.',
    notes: 'Follow-through: uwa_ft_ber_novembre, the national commemoration told in another language.',
  },
}

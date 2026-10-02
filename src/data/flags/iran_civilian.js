/**
 * IRAN_CIVILIAN_FLAGS — flags for events_iran_civilian.js: Iran as the
 * kitchen, the alley and the roof lived it. Each is consumed by an `irc_ft_*`
 * follow-through in that module (or, for irc_tehran_2025, a text branch).
 */
export const IRAN_CIVILIAN_FLAGS = {
  irc_qanat_turn: {
    weight: 'moderate', category: 'cultural', intent: 'event',
    description: 'Took the family\'s night-time water turn from the qanat as a village child in central Iran.',
    notes: 'Follow-through: irc_ft_qanat, the qanat and the Zayandeh Rud dry.',
  },
  irc_literacy_corps: {
    weight: 'moderate', category: 'education', intent: 'event',
    description: 'Learned to read from a Literacy Corps conscript teacher in the village, 1964-78.',
    notes: 'Follow-through: irc_ft_letters, reading the village\'s letters aloud.',
  },
  irc_azeri_tongue: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Azeri child who learned at school that Turkish stays at home.',
    notes: 'Follow-through: irc_ft_azeri, the laylay a grandchild cannot understand.',
  },
  irc_mordad_28: {
    weight: 'moderate', category: 'historical', intent: 'event',
    description: 'Saw the coup of 19 August 1953 in Tehran.',
    notes: 'Follow-through: irc_ft_mordad_1967, Mosaddegh\'s death at Ahmadabad.',
  },
  irc_paykan: {
    weight: 'minor', category: 'economic', intent: 'event',
    description: 'The family\'s first car was a Paykan.',
    notes: 'Follow-through: irc_ft_paykan, the last one off the line in 2005.',
  },
  irc_rooftop_1978: {
    weight: 'major', category: 'historical', intent: 'event',
    description: 'Heard, or joined, the Allahu Akbar from the Tehran rooftops in autumn 1978.',
    notes: 'Follow-through: irc_ft_rooftops_2022.',
  },
  irc_kurdistan_1979: {
    weight: 'moderate', category: 'conflict', intent: 'event',
    description: 'Kurdish family in Iran during the army\'s 1979 campaign in Kurdistan.',
    notes: 'Follow-through: irc_ft_jina_2022.',
  },
  irc_coupon_years: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Lived the war years by the ration coupon book.',
    notes: 'Follow-through: irc_ft_yaraneh, the cash subsidy of 2010.',
  },
  irc_brother_front: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'A brother went to the front in the Iran-Iraq war.',
    notes: 'Follow-through: irc_ft_brother_back.',
  },
  irc_martyr_street: {
    weight: 'moderate', category: 'historical', intent: 'event',
    description: 'A neighbour\'s son killed in the war became the mural and the street name.',
    notes: 'Follow-through: irc_ft_murals, the mural faded and half painted over.',
  },
  irc_war_of_cities: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived through the 1988 missile strikes on Tehran.',
    notes: 'Follow-through: irc_ft_red_alert (the body at fireworks) and the irc_tehran_2025 branch.',
  },
  irc_komiteh_night: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Was at a party raided by the komiteh as a young adult.',
    notes: 'Follow-through: irc_ft_komiteh, waiting up for your own child.',
  },
  irc_konkur_rank: {
    weight: 'moderate', category: 'education', intent: 'event',
    description: 'Sat the konkur, the national university entrance exam.',
    notes: 'Follow-through: irc_ft_konkur, your child sits it.',
  },
  irc_kurd_name: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Was refused a Kurdish name for a child at the registry.',
    notes: 'Follow-through: irc_ft_jina_2022.',
  },
  irc_tir_1999: {
    weight: 'major', category: 'political', intent: 'event',
    description: 'A Tehran student during the July 1999 dormitory attack and protests.',
    notes: 'Follow-through: irc_ft_tir_2009 and irc_ft_rooftops_2022.',
  },
  irc_aban_98: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Lived through the November 2019 fuel protests and the internet shutdown.',
    notes: 'Follow-through: irc_ft_rooftops_2022.',
  },
  irc_khuzestan_1980: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived in Khuzestan when Iraq invaded in September 1980: Ahvaz shelled, the border villages emptied.',
    notes: 'Follow-through: irc_ft_khuzestan_palms, the beheaded palms along the Arvand.',
  },
}

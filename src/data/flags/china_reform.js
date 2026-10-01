/**
 * CHINA_REFORM_FLAGS — flags for events_china_reform.js: China after 1980 as
 * it reached a household. Each is consumed by a `cnr_ft_*` follow-through in
 * that module.
 */
export const CHINA_REFORM_FLAGS = {
  cnr_household_plot: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Drew the family\'s field by lot when the production team was decollectivised, 1980-82.',
    notes: 'Follow-through: cnr_ft_tax_2006, the end of the agricultural tax.',
  },
  cnr_tied_1983: {
    weight: 'major', category: 'trauma', intent: 'event',
    description: 'Rural mother of two sterilised in the 1983 campaign.',
    notes: 'Follow-through: cnr_ft_two_child, the two-child policy of 2016.',
  },
  cnr_spring_1989: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Lived the spring of 1989 outside Beijing (Shanghai, Chongqing or rural Sichuan).',
    notes: 'Follow-through: cnr_ft_1989_silence, the thirtieth anniversary.',
  },
  cnr_xiahai: {
    weight: 'moderate', category: 'career', intent: 'event',
    description: 'Left the work unit to go into business after the 1992 southern tour.',
    notes: 'Follow-through: cnr_ft_xiahai.',
  },
  cnr_stayed_unit: {
    weight: 'minor', category: 'career', intent: 'event',
    description: 'Stayed in the work unit when colleagues went into business in 1992.',
    notes: 'Follow-through: cnr_ft_xiahai.',
  },
  cnr_bought_danwei_flat: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Bought the family\'s flat from the work unit in the 1990s housing reform.',
    notes: 'Follow-through: cnr_ft_chaiqian, demolition and compensation.',
  },
  cnr_dagong: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Left rural Sichuan to work in a Shanghai factory.',
    notes: 'Follow-through: cnr_ft_chunyun, cnr_ft_left_child, cnr_ft_return_village.',
  },
  cnr_three_gorges: {
    weight: 'moderate', category: 'displacement', intent: 'event',
    description: 'Family displaced by the Three Gorges reservoir.',
    notes: 'Follow-through: cnr_ft_reservoir.',
  },
  cnr_sars: {
    weight: 'moderate', category: 'health', intent: 'event',
    description: 'Lived through SARS in Beijing or Shanghai in 2003.',
    notes: 'Follow-through: cnr_ft_sars_2020.',
  },
  cnr_tibet_2008: {
    weight: 'major', category: 'political', intent: 'event',
    description: 'Tibetan in western Sichuan during the March 2008 protests and the crackdown that followed.',
    notes: 'Follow-through: cnr_ft_tibet.',
  },
  cnr_wenchuan: {
    weight: 'moderate', category: 'trauma', intent: 'event',
    description: 'Lived the Wenchuan earthquake of 12 May 2008.',
    notes: 'Follow-through: cnr_ft_wenchuan_2018.',
  },
}

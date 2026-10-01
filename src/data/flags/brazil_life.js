/**
 * BRAZIL_LIFE_FLAGS — flags for events_brazil_life.js: the Brazilian century
 * as ordinary life. Each is consumed by a `brl_ft_*` follow-through in that
 * module.
 */
export const BRAZIL_LIFE_FLAGS = {
  brl_maracanazo: {
    weight: 'minor', category: 'cultural', intent: 'event',
    description: 'Heard the 1950 World Cup final, the Maracanazo, as a child.',
    notes: 'Follow-through: brl_ft_7a1, Germany 7 Brazil 1 in 2014.',
  },
  brl_candango_father: {
    weight: 'moderate', category: 'migration', intent: 'event',
    description: 'A father from the sertão went to build Brasília, 1957-59.',
    notes: 'Follow-through: brl_ft_brasilia.',
  },
  brl_mnu_1978: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Black Paulistano at the launch of the Movimento Negro Unificado, 1978.',
    notes: 'Follow-through: brl_ft_lei_10639, a child taught Afro-Brazilian history.',
  },
  brl_racionais: {
    weight: 'minor', category: 'identity', intent: 'event',
    description: 'Black teenager in the São Paulo periphery when Racionais MC\'s released Sobrevivendo no Inferno.',
    notes: 'Follow-through: brl_ft_lei_10639.',
  },
  brl_fiscal_sarney: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Lived the 1986 Cruzado price freeze.',
    notes: 'Follow-through: brl_ft_urv, the Real in 1994.',
  },
  brl_confisco: {
    weight: 'major', category: 'economic', intent: 'event',
    description: 'Had savings frozen by the Collor Plan in March 1990.',
    notes: 'Follow-through: brl_ft_confisco_back, the instalments of 1991-92.',
  },
  brl_caras_pintadas: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'A cara-pintada student in the 1992 protests against Collor.',
    notes: 'Follow-through: brl_ft_june_2013.',
  },
  brl_dekasegi: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Nikkei Brazilian who went to work in Japanese factories after 1990.',
    notes: 'Follow-through: brl_ft_dekasegi_return, the 2009 paid return.',
  },
  brl_zika_year: {
    weight: 'moderate', category: 'health', intent: 'event',
    description: 'A woman of childbearing age in the Northeast during the 2015-16 Zika microcephaly epidemic.',
    notes: 'Follow-through: brl_ft_zika.',
  },
  brl_family_group_split: {
    weight: 'minor', category: 'family', intent: 'event',
    description: 'The family WhatsApp group split over politics, 2018-21.',
    notes: 'Follow-through: brl_ft_natal_2022.',
  },
}

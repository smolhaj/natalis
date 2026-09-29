/**
 * UNWRITTEN_AMERICAS_FLAGS — the flags set by events_unwritten_americas.js,
 * four populations the roster modelled and no guard had ever named: white
 * Venezuelans, white Colombians, Belizean Creoles and Afro-Puerto Ricans.
 *
 * Prefixed `uam_` because `am_` is already Armenia's place-id prefix.
 * Every flag here is consumed by a follow-through in the same module.
 */
export const UNWRITTEN_AMERICAS_FLAGS = {

  // ── Venezuela: white_venezuelan
  uam_ve_european_parents: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Child of the 1950s European immigration to Venezuela (Galicia or the Canary Islands).',
    notes: 'Gates uam_ve_passport: the parent\'s nationality is the exit a generation later.',
  },
  uam_ve_dame_dos: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Shopped in Miami during the oil-boom bolívar of 1974-82.',
    notes: 'Follow-through: uam_ve_ft_viernes_negro, the devaluation of 18 February 1983.',
  },
  uam_ve_left: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Left Venezuela for Spain on a parent\'s passport in the 2000s-2010s.',
    notes: 'Follow-through: uam_ve_ft_after (abroad branch).',
  },
  uam_ve_stayed: {
    weight: 'moderate', category: 'migration', intent: 'event',
    description: 'Held a Spanish passport and chose to stay in Venezuela.',
    notes: 'Follow-through: uam_ve_ft_after (home branch, the scarcity years).',
  },

  // ── Colombia: white_colombian
  uam_co_finca_road: {
    weight: 'moderate', category: 'conflict', intent: 'event',
    description: 'The family stopped driving to the finca during the roadblock-kidnapping years, 1998-2002.',
    notes: 'Follow-through: uam_co_ft_caravan, the escorted holiday caravans from 2003.',
  },
  uam_co_escobar_years: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived in Medellín through Escobar\'s bombing war, 1989-93.',
    notes: 'Follow-through: uam_co_ft_monaco, the demolition of the Mónaco building in 2019 and the tourists.',
  },

  // ── Belize: creole_belizean
  uam_bz_hattie: {
    weight: 'major', category: 'trauma', intent: 'event',
    description: 'Lived through Hurricane Hattie in Belize City, 31 October 1961.',
    notes: 'Follow-through: uam_bz_ft_hattie, Belmopan and the storm as the city\'s calendar.',
  },
  uam_bz_went_states: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Left British Honduras / Belize for Los Angeles in the emigration of 1962-95.',
    notes: 'Follow-through: uam_bz_ft_barrel.',
  },

  // ── Puerto Rico: afro_puerto_rican
  uam_pr_the_grandmother: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Learned as a child the island\'s language of hair and "improving the race", and the grandmother kept in the kitchen.',
    notes: 'Follow-through: uam_pr_ft_census, the 2020 census that stopped saying the island was white.',
  },
  uam_pr_went_north: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Went to New York in the Great Migration of 1946-65.',
    notes: 'Follow-through: uam_pr_ft_bronx, being read as Black in a city that did not know the island\'s categories.',
  },
  uam_pr_maria: {
    weight: 'major', category: 'trauma', intent: 'event',
    description: 'Lived through Hurricane María on the island, September 2017.',
    notes: 'Follow-through: uam_pr_ft_maria, the revised death count of August 2018.',
  },
}

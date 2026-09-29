/**
 * UNWRITTEN_ESA_FLAGS — flags for events_unwritten_east_south_africa.js: the
 * Afar of Djibouti, the Tigre of Eritrea, the Banda of the Central African
 * Republic, the Ambundu of Angola and the Tsonga/Shangaan of Mozambique — five
 * groups the roster modelled and `unwritten-group` found no guard had named.
 *
 * Every flag here is consumed by a follow-through event in the same module.
 */
export const UNWRITTEN_ESA_FLAGS = {

  // ── Afar, Djibouti
  esa_afar_herding: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Grew up moving the herd and the ari between wells in the Afar interior.',
    notes: 'Follow-through: esa_afar_ft_herd — the herd shrinking, the dry years of 2008–11, the ari folded against a concrete wall.',
  },
  esa_afar_frud_fighter: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Went up into the northern mountains with FRUD in the 1991–94 insurgency.',
    notes: 'Follow-through: esa_afar_ft_frud (fighter variant) after the 2001 accord.',
  },
  esa_afar_frud_war: {
    weight: 'moderate', category: 'conflict', intent: 'event',
    description: 'Lived through the FRUD war as an Afar civilian under the roadblocks.',
    notes: 'Follow-through: esa_afar_ft_frud (civilian variant).',
  },

  // ── Tigre, Eritrea
  esa_tig_elf_fighter: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Joined the Eritrean Liberation Front in the lowlands.',
    notes: 'Follow-through: esa_tig_ft_elf — independence in 1991–93 under the other front.',
  },
  esa_tig_sudan_camp: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Fled a burned lowland village into the Sudanese camps.',
    notes: 'Set with p.emigrateTo(Sudan). Follow-through: esa_tig_ft_camp — the 2001 repatriation offer.',
  },

  // ── Banda, Central African Republic
  esa_ban_uniform_1979: {
    weight: 'major', category: 'political', intent: 'event',
    description: 'A schoolchild in Bangui during the uniform protests and the Ngaragba killings of 1979.',
    notes: 'Follow-through: esa_ban_ft_1979 — Bokassa rehabilitated in 2010.',
  },
  esa_ban_mpoko: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Sheltered in a displacement site (M\'Poko airport or a Bambari church compound) in 2013–14.',
    notes: 'Follow-through: esa_ban_ft_mpoko, after the camps closed in 2017.',
  },
  esa_ban_2013: {
    weight: 'moderate', category: 'conflict', intent: 'event',
    description: 'Stayed in the house through the Séléka and anti-balaka violence of 2013–14.',
    notes: 'Follow-through: esa_ban_ft_mpoko (stayed variant).',
  },

  // ── Ambundu, Angola
  esa_amb_cassanje_1961: {
    weight: 'major', category: 'historical', intent: 'event',
    description: 'Lived through the Baixa de Cassanje cotton revolt and its bombing in 1961.',
    notes: 'Follow-through: esa_amb_ft_cassanje — 4 January as a public day, the number that is not the village\'s.',
  },
  esa_amb_27maio: {
    weight: 'major', category: 'political', intent: 'event',
    description: 'In Luanda through 27 May 1977 and the purge that followed.',
    notes: 'Follow-through: esa_amb_ft_27maio — silence before 2021, the apology after.',
  },

  // ── Tsonga/Shangaan, Mozambique
  esa_tso_miner: {
    weight: 'major', category: 'economic', intent: 'event',
    description: 'Worked contracts on the South African gold mines through Wenela or TEBA.',
    notes: 'Follow-through: esa_tso_ft_miner — the cough; the Tshiamiso silicosis claims from 2020.',
  },
  esa_tso_kruger: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Crossed Kruger on foot into South Africa during the Renamo war.',
    notes: 'Set with p.emigrateTo(South Africa, undocumented). Follow-through: esa_tso_ft_kruger — the 1996/2000 exemptions.',
  },
  esa_tso_flood_2000: {
    weight: 'moderate', category: 'disaster', intent: 'event',
    description: 'Lived through the Limpopo floods of 2000 in Gaza.',
    notes: 'Follow-through: esa_tso_ft_flood — Chókwè under water again in 2013.',
  },
}

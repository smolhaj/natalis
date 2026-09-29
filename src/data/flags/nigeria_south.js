/**
 * NIGERIA_SOUTH_FLAGS — flags for events_nigeria_south.js (the creeks, the East
 * after the war, the West) and the new flags in events_nigeria.js (the Abacha
 * years). Each `event` flag is consumed by a follow-through or a text variant
 * named in its notes.
 */
export const NIGERIA_SOUTH_FLAGS = {

  // ── events_nigeria.js ─────────────────────────────────────────────────────
  nga_kudirat_1996: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Lived through the assassination of Kudirat Abiola in Lagos, June 1996.',
    notes: 'Set by nga_kudirat_1996. Consumed by nga_ft_democracy_day_2019.',
  },
  nga_abacha_years: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Lived through June 1998 in Nigeria: Abacha dead on the 8th, Abiola dead in detention on 7 July.',
    notes: 'Set by nga_1998_two_deaths. Consumed by nga_ft_abacha_loot (the repatriations, 2018–21).',
  },
  june12_honoured: {
    weight: 'minor', category: 'political', intent: 'none',
    description: 'Saw 12 June made a public holiday in 2019.',
    notes: 'Set by nga_ft_democracy_day_2019. Terminal.',
  },

  // ── events_nigeria_south.js: the creeks ────────────────────────────────────
  ngs_boro_1966: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'A child or young person in the Delta during Isaac Boro\'s twelve-day republic, February 1966.',
    notes: 'Set by ngs_boro_1966. Consumed by ngs_kaiama_1998 (text) and ngs_ft_boro.',
  },
  ngs_rivers_biafra: {
    weight: 'moderate', category: 'conflict', intent: 'event',
    description: 'In the creeks when Rivers State was created and Biafra claimed it, May 1967.',
    notes: 'Set by ngs_rivers_1967. Consumed by ngs_bayelsa_1996 (text).',
  },
  ngs_flare_child: {
    weight: 'moderate', category: 'health', intent: 'event',
    description: 'Grew up beside a gas flare and a pipeline in a Delta creek village.',
    notes: 'Set by ngs_flare_child. Consumed by ngs_ft_flare_cough.',
  },
  ngs_bayelsa_state: {
    weight: 'minor', category: 'political', intent: 'none',
    description: 'In the Delta when Bayelsa State was created, October 1996.',
    notes: 'Set by ngs_bayelsa_1996. Terminal.',
  },
  ngs_kaiama: {
    weight: 'moderate', category: 'political', intent: 'none',
    description: 'In the Delta at the Kaiama Declaration and the Yenagoa shootings, December 1998.',
    notes: 'Set by ngs_kaiama_1998. The echo is carried by nga_delta_community texture.',
  },
  ngs_odi_1999: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'In the Delta when the army razed Odi, November 1999.',
    notes: 'Set by ngs_odi_1999. Consumed by ngs_ft_odi_judgment (the 2013 compensation ruling).',
  },
  ngs_creek_camp: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Joined a militant camp in the creeks during the MEND years, 2006–08.',
    notes: 'Set by ngs_mend_2006. Consumed by ngs_amnesty_2009 (the gun handed in).',
  },
  ngs_mend_years: {
    weight: 'moderate', category: 'conflict', intent: 'none',
    description: 'Stayed out of the militancy in the creeks during the MEND years.',
    notes: 'Set by ngs_mend_2006. Terminal; ngs_amnesty_2009 speaks to everyone outside the camps.',
  },
  ngs_amnesty_2009: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'In the Delta for the 2009 amnesty and the stipends.',
    notes: 'Set by ngs_amnesty_2009. Consumed by ngs_ft_jonathan_2015 (text).',
  },
  ngs_jonathan_creeks: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Saw Goodluck Jonathan, an Ijaw from Otuoke, become president in 2010, from the creeks.',
    notes: 'Set by ngs_jonathan_2010. Consumed by ngs_ft_jonathan_2015 (the concession).',
  },

  // ── the East after the war ────────────────────────────────────────────────
  ngs_abandoned_property: {
    weight: 'major', category: 'economic', intent: 'event',
    description: 'An Igbo family whose Port Harcourt property was kept by Rivers State as "abandoned".',
    notes: 'Set by ngs_abandoned_property. Consumed by ngs_ft_abandoned.',
  },
  ngs_igba_boi: {
    weight: 'major', category: 'economic', intent: 'event',
    description: 'Served as an igba boi apprentice to a trader in Onitsha Main Market.',
    notes: 'Set by ngs_igba_boi with mem.ngs_igba_age. Consumed by ngs_ft_igba_settled six years on.',
  },
  ngs_igba_settled: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Was settled by the master with a stall and stock after the apprenticeship.',
    notes: 'Set by ngs_ft_igba_settled. Consumed by ngs_ft_own_boy.',
  },
  ngs_ipob_years: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'In the Southeast when IPOB and Nnamdi Kanu rose, 2015–20.',
    notes: 'Set by ngs_ipob. Consumed by ngs_ft_sit_at_home (the Monday sit-at-home, 2021–22).',
  },

  // ── the West ──────────────────────────────────────────────────────────────
  ngs_wetie_1965: {
    weight: 'moderate', category: 'conflict', intent: 'event',
    description: 'In the Western Region during "Operation Wetie", October 1965 to January 1966.',
    notes: 'Set by ngs_wetie_1965. Consumed by ngs_awolowo_1987 (text).',
  },
  ngs_agbekoya: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'In Oyo or Ibadan during the Agbekoya farmers\' revolt, 1968–69.',
    notes: 'Set by ngs_agbekoya. Consumed by ngs_ft_agbekoya.',
  },
  ngs_awo_mourned: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'A Yoruba in the West when Obafemi Awolowo died, May 1987.',
    notes: 'Set by ngs_awolowo_1987. Consumed by ngs_ft_awo_picture.',
  },
  ngs_opc_member: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Joined the Oodua People\'s Congress in the clashes of 1999–2001.',
    notes: 'Set by ngs_opc. Consumed by ngs_ft_opc (Gani Adams made Aare Ona Kakanfo, 2018).',
  },

  // ── national, seen from here ──────────────────────────────────────────────
  ngs_first_line: {
    weight: 'moderate', category: 'technology', intent: 'event',
    description: 'Was in a Nigerian city when GSM arrived in August 2001: the SIM price, flashing.',
    notes: 'Set by ngs_gsm_2001. Consumed by ngs_ft_flash.',
  },
  ngs_occupy_2012: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Lived through the January 2012 subsidy removal and Occupy Nigeria.',
    notes: 'Set by ngs_occupy_2012. Consumed by ngs_ft_subsidy_2023.',
  },
}

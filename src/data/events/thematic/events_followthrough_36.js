// events_followthrough_36.js — MODE B follow-throughs
// 6 events: Guatemala arc echoes (6)

export const FOLLOWTHROUGH_36_EVENTS = [

  // ─── GUATEMALA ────────────────────────────────────────────────────────────────

  {
    id: 'ft36_1954_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('gua_1954_coup_generation') &&
      G.age >= 55 &&
      !G.mem?.ft36CoupLate,
    text: 'The CIA declassified the Operation PBSUCCESS documents in 1997. The planning cables, the radio disinformation scripts, the list of Guatemalans to be "eliminated" if necessary. What was done to Guatemala in 1954 is now in the official record: the CIA overthrew an elected government because the United Fruit Company\'s fallow land was being redistributed to the landless. The Dulles brothers — one at the State Department, one at the CIA — both had financial connections to United Fruit. This is not a conspiracy theory. It is in the released documents. You have lived long enough to watch a cover story be replaced by its own paperwork.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m += 2; p.setMem('ft36CoupLate', true) },
  },

  {
    id: 'ft36_scorched_earth_ceh',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('gua_scorched_earth_generation') &&
      G.currentYear >= 1999 &&
      G.age >= 45 &&
      !G.mem?.ft36ScorchedCEH,
    text: 'The Commission for Historical Clarification publishes its report in February 1999. It concludes that acts of genocide were committed against Maya groups in four regions: the Ixil area, Rabinal, the Zacualpa area, and the Chuj and Q\'anjob\'al peoples. 669 massacres. 440 villages destroyed. It names the army command structure. It finds the US government bears responsibility for training and supporting the forces that carried out the genocide. It recommends prosecution. None of the named individuals are prosecuted under the report. The report is in the library. You are alive to read it.',
    choices: null,
    effect: (p) => { p.r += 7; p.m += 4; p.karma += 3; p.setMem('ft36ScorchedCEH', true) },
  },

  {
    id: 'ft36_modelo_village_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('gua_modelo_village_generation') &&
      G.age >= 50 &&
      !G.mem?.ft36ModeloLate,
    text: 'The model village — the polo de desarrollo — has been a regular village for thirty years now. The military post is gone. The rows of houses are still the rows of houses, though people have added rooms and gardens and walls in the decades since. You live in a house the army built to contain you. The house has become yours in the way that things become yours when enough time passes. The origin does not disappear. It recedes into the structure of the thing, which is its own kind of permanence.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 4; p.setMem('ft36ModeloLate', true) },
  },

  {
    id: 'ft36_peace_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('gua_1996_peace_generation') &&
      G.age >= 55 &&
      !G.mem?.ft36PeaceLate,
    text: 'The peace accords committed the Guatemalan government to indigenous rights protections, land reform, demilitarisation. Of these commitments: the civil patrols were formally dissolved, the army reduced in size. The land reform did not happen. The indigenous rights framework was drafted and partially implemented. Guatemala is a more stable country than it was in 1996 in measurable ways. It is also a country where 65 percent of the population lives below the poverty line and where the people who committed the genocide are not in prison. The peace is real. So is what it didn\'t resolve.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 3; p.e += 3; p.setMem('ft36PeaceLate', true) },
  },

  {
    id: 'ft36_rios_montt_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('gua_rios_montt_witness') &&
      G.currentYear >= 2018 &&
      G.age >= 50 &&
      !G.mem?.ft36RiosDeath,
    text: 'Efraín Ríos Montt died on April 1, 2018, at ninety-one, while a new trial was pending. He died at home. The original conviction — the one that held for ten days in 2013 before the Constitutional Court annulled it — named him responsible for 1,771 killings in the Ixil region, the forced displacement of 29,000 Maya Q\'anjob\'al people, and the organised sexual violence against Maya women. He denied everything until the end. The survivors who testified are still alive. The ten days the verdict existed are in the court record. Whether that constitutes justice is a question you have thought about for years.',
    choices: null,
    effect: (p) => { p.r += 8; p.m += 3; p.karma += 3; p.setMem('ft36RiosDeath', true) },
  },

  {
    id: 'ft36_highland_maya_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('gua_highland_maya') &&
      G.age >= 58 &&
      !G.mem?.ft36HighlandLate,
    text: 'The traje — the woven cloth whose patterns say where you are from — is sold in markets in Antigua to tourists who photograph it and post it online. This is not what makes you feel what you feel. What makes you feel it is that the patterns are still being woven, still being worn, still carrying the information they carried when your mother wore them. The state spent decades trying to eliminate what you are. The weaving is still happening. This is not a small thing.',
    choices: null,
    effect: (p) => { p.m += 6; p.karma += 4; p.r += 3; p.setMem('ft36HighlandLate', true) },
  },

]

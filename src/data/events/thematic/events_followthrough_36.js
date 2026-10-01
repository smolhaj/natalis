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
    text: 'The CIA declassified the Operation PBSUCCESS documents in 1997. The planning cables, the radio disinformation scripts, the list of Guatemalans to be "eliminated" if necessary. What was done to Guatemala in 1954 is now in the official record: the CIA overthrew an elected government because the United Fruit Company\'s fallow land was being redistributed to the landless. The Dulles brothers — one at the State Department, one at the CIA — both had financial connections to United Fruit. It is in the released documents. You have lived long enough to watch a cover story be replaced by its own paperwork.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m += 2; p.setMem('ft36CoupLate', true) },
  },

  {
    id: 'ft36_scorched_earth_ceh',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('gua_scorched_earth_generation') &&
      G.currentYear >= 1999 &&
      G.age >= 45 &&
      !G.mem?.ft36ScorchedCEH,
    text: 'February 1999, and the truth commission\'s report: acts of genocide against the Maya, the massacres listed one by one, the army command named, the United States held responsible for training the men who did it. It recommends prosecution, and nobody named in it is prosecuted on its account. The report is in the library. You are alive to read it.',
    context: 'The Commission for Historical Clarification documented 626 massacres and found that the state committed acts of genocide against Maya groups between 1981 and 1983.',
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
    text: 'The model village has been an ordinary village for thirty years. The army post is gone; the rows of houses are still rows, with rooms and gardens and walls added since. You live in a house the army built to keep you in. It has become yours, the way things do after enough time. Where it came from has not gone. It has settled into the walls.',
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
    text: 'The accords promised indigenous rights, land reform, a smaller army. The civil patrols were dissolved and the army shrank. The land reform never came, and the rights framework was drafted and half carried out. There is peace, and most people are poor, and the men who ordered the massacres are not in prison. Both of those are what 1996 left.',
    context: 'About 65 per cent of Guatemalans lived below the poverty line in the decades after the 1996 peace accords.',
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
    text: 'Ríos Montt dies at home on April 1, 2018, ninety-one years old, with a new trial pending. In 2013 a court convicted him of genocide, and the verdict stood for ten days before the Constitutional Court annulled it. He denied everything to the end. The women who testified are still alive, and the ten days are in the court record. Whether that is justice is a question you have carried for years.',
    context: 'The 2013 verdict held him responsible for the killing of 1,771 Ixil Maya, the displacement of tens of thousands and organised sexual violence against Maya women.',
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

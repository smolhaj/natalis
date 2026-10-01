// events_followthrough_37.js — Honduras flag follow-throughs (5 events)
// Callbacks for: hon_battalion_316_generation, hon_mitch_survivor,
// hon_zelaya_generation, hon_berta_witness, hon_banana_generation

export const FOLLOWTHROUGH_37_EVENTS = [

  // ─── BATTALION 316: COFADEH TRUTH ────────────────────────────────────────────

  {
    id: 'ft37_battalion_truth',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('hon_battalion_316_generation') &&
      G.currentYear >= 2000 &&
      G.age >= 50 &&
      !G.mem?.ft37BattalionTruth,
    text: 'The committee of relatives has been cataloguing the disappeared since 1982, and the cases number in the hundreds. The Americans who trained Battalion 316 have given interviews about their methods; the Honduran officers who gave the orders retired on pensions; some files were declassified. None of it produced a trial. The documentation is complete and filed, and the people named in it are dead or comfortable or both.',
    choices: null,
    effect: (p) => { p.r += 7; p.m -= 5; p.karma += 3; p.setMem('ft37BattalionTruth', true) },
  },

  // ─── HURRICANE MITCH: RECONSTRUCTION AND EMIGRATION ──────────────────────────

  {
    id: 'ft37_mitch_late',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('hon_mitch_survivor') &&
      G.currentYear >= 2008 &&
      G.age >= 45 &&
      !G.mem?.ft37MitchLate,
    text: 'The roads came back, and most of the bridges, and in time the crops. The people did not. The leaving that started after Mitch never slowed, and the villages that sent the most north are half the size they were in 1997. You are still here, and they are still gone. The hurricane killed for four days and then went on emptying the country for a decade.',
    context: 'Hurricane Mitch killed about 7,000 people in Honduras in October 1998 and destroyed much of the country\'s infrastructure.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 4; p.setMem('ft37MitchLate', true) },
  },

  // ─── ZELAYA COUP: XIOMARA CASTRO 2021 ────────────────────────────────────────

  {
    id: 'ft37_zelaya_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('hon_zelaya_generation') &&
      G.currentYear >= 2022 &&
      G.age >= 55 &&
      !G.mem?.ft37ZelayaLate,
    text: 'January 2022: Xiomara Castro takes the oath as the first woman president of Honduras, with her husband in the front row. Zelaya was put on a plane in his pyjamas in 2009, and twelve years of governments followed from that morning. The institutions that expelled him are still there, and the interests that called it constitutional. Now she is there too. You are watching to find out what the morning means.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.e += 2; p.setMem('ft37ZelayaLate', true) },
  },

  // ─── BERTA CÁCERES: DESA CONVICTION 2021 ─────────────────────────────────────

  {
    id: 'ft37_berta_late',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('hon_berta_witness') &&
      G.currentYear >= 2021 &&
      G.age >= 45 &&
      !G.mem?.ft37BertaLate,
    text: 'In 2021 a court convicts the head of the company building the Agua Zarca dam of helping to plan the murder of Berta Cáceres. The Gualcarque is not dammed. Stopping the dam cost Berta her life, and the court found that the company knew that was the price and was willing to pay it. Honduras is still one of the most dangerous places on earth to defend a river.',
    choices: null,
    effect: (p) => { p.karma += 5; p.r += 5; p.m -= 3; p.setMem('ft37BertaLate', true) },
  },

  // ─── BANANA GENERATION: CHIQUITA PARAMILITARY FUNDING ────────────────────────

  {
    id: 'ft37_banana_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('hon_banana_generation') &&
      G.currentYear >= 2007 &&
      G.age >= 55 &&
      !G.mem?.ft37BananaLate,
    text: 'In 2007 Chiquita, which used to be United Fruit, the company that gave the world the phrase banana republic, pleads guilty in an American court to paying a Colombian paramilitary group. For the protection of its workers, it says; nobody asked the workers. It pays a fine and carries on, and the bananas are still in the supermarkets. What it did is now a matter of public record. That is not the same as a consequence.',
    context: 'Chiquita admitted paying about 1.7 million dollars to the AUC between 1997 and 2004 and was fined 25 million dollars.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 4; p.setMem('ft37BananaLate', true) },
  },

]

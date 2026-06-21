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
    text: 'The Committee of Relatives of the Detained and Disappeared in Honduras — COFADEH — has been cataloguing cases since 1982. The cases number in the hundreds. The CIA officers who trained Battalion 316 have given interviews explaining their methods. The Honduran officials who ordered the disappearances retired with pensions. The United States declassified some files. None of this produced a trial. You have watched the machinery of accountability do its work and arrive at the same place it always does: the documentation is complete; the document is filed; the people named in it are dead or comfortable or both.',
    choices: null,
    effect: (p) => { p.r += 7; p.m -= 5; p.karma += 3; p.setMem('ft37BattalionTruth', true) },
  },

  // ─── HURRICANE MITCH: RECONSTRUCTION AND EMIGRATION ──────────────────────────

  {
    id: 'ft37_mitch_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('hon_mitch_survivor') &&
      G.currentYear >= 2008 &&
      G.age >= 45 &&
      !G.mem?.ft37MitchLate,
    text: 'The reconstruction happened, in the way that reconstruction happens: the roads came back, the bridges came back in most places, the crops eventually came back. What did not come back was the population. The emigration that accelerated after Mitch did not slow down. Whole generations left for the United States. The villages that sent the most people are half the size they were in 1997. You are still here. The people who left are still gone. The hurricane took seven thousand lives in four days and then kept taking people for the next decade by making it unlivable enough that leaving seemed like the better calculation.',
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
    text: 'In January 2022, Xiomara Castro was inaugurated as the first woman president of Honduras. She is Zelaya\'s wife. The coup that removed him in 2009 and the elections the coup government ran and the twelve years of the governments that followed — all of it led to this morning, to Zelaya sitting in the front row watching his wife take the oath. You are not sure what this means. The same institutions that expelled him in pyjamas are still there. The same interests that called the coup constitutional are still there. She is also there. Whether the morning means what a morning can mean, you are watching to find out.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.e += 2; p.setMem('ft37ZelayaLate', true) },
  },

  // ─── BERTA CÁCERES: DESA CONVICTION 2021 ─────────────────────────────────────

  {
    id: 'ft37_berta_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('hon_berta_witness') &&
      G.currentYear >= 2021 &&
      G.age >= 45 &&
      !G.mem?.ft37BertaLate,
    text: 'In 2021, a Honduran court convicted David Castillo — the executive of Desarrollos Energéticos, the company building the Agua Zarca dam — as a co-conspirator in Berta Cáceres\'s murder. He received more than twenty-two years. The Gualcarque River is not dammed. The dam is not built. The activism that stopped it cost Berta her life, and the court confirmed that the company knew this was the price it was willing to pay. The Goldman Environmental Prize she received the year before her death is still awarded annually. Honduras is still the most dangerous country in the world for environmental defenders. The conviction is real. It does not undo the cost of obtaining it.',
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
    text: 'In 2007, Chiquita Brands International — formerly United Fruit, the company that gave Honduras the name "banana republic" — pleaded guilty in US federal court to making payments to the AUC, a Colombian paramilitary group designated a terrorist organisation by the United States. Twenty-five million dollars, over a period of years. They said it was for the protection of their workers. The workers in question were not consulted. The company paid a fine and continued operating. Chiquita bananas are still in supermarkets. The company\'s relationship to the violence around its operations is now a matter of public record and legal fact, which is different from being a consequence.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 4; p.setMem('ft37BananaLate', true) },
  },

]

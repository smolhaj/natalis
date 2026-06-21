// events_followthrough_46.js — world-event follow-throughs (15 events)
// Callbacks for: chechen_war_generation, witnessed_democracy_end, liberation_war_generation,
// guinea_independence_proclaimed, jamaican_independence_generation, bay_of_pigs_generation,
// mariel_generation, cochabamba_witness, bol_evo_generation, sg_independence_witness,
// sg_lky_mourning_witness, kaz_zhanaozen_witness, mobutu_fall_generation,
// eritrean_border_war_era, nz_rainbow_warrior_generation

export const FOLLOWTHROUGH_46_EVENTS = [

  // ─── CHECHEN WAR — DISTANT WITNESS ──────────────────────────────────────────

  {
    id: 'ft46_chechen_war_distant_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('chechen_war_generation') &&
      !G.flags.has('chechen_civilian') &&
      G.age >= 55 &&
      G.currentYear >= 2005 &&
      !G.mem?.ft46ChechWar,
    text: 'The second Chechen war is generally considered to have ended, though the men who fought it are still coming back in installments. In your working life you have known what Grozny represented to Russians of different persuasions: the humiliation of the first war, the redemption narrative of the second, the price paid for that narrative by people who were not Russian and some who were. The rebuilt Grozny is now shown on television as a kind of proof. What it proves depends on who is asking. You are old enough to hold the question without needing it to resolve.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 2; p.setMem('ft46ChechWar', true) },
  },

  // ─── WITNESSED DEMOCRACY END — GERMANY 1933 ─────────────────────────────────

  {
    id: 'ft46_witnessed_democracy_end_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('witnessed_democracy_end') &&
      G.age >= 60 &&
      G.currentYear >= 1970 &&
      !G.mem?.ft46WitnessedDemocracy,
    text: 'You were young when the Reichstag burned and the Enabling Act passed. What came after is part of your life in the way foundations are part of a house — invisible, load-bearing, not available for ordinary inspection. The Federal Republic was built on those ruins with the specific architectural care of a country that knew what had replaced the last republic. You have watched every new crack in its walls with the attention of someone who knows what can be constructed on foundations that fail.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft46WitnessedDemocracy', true) },
  },

  // ─── LIBERATION WAR — BANGLADESH 1971 ───────────────────────────────────────

  {
    id: 'ft46_liberation_war_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('liberation_war_generation') &&
      G.age >= 55 &&
      G.currentYear >= 1990 &&
      !G.mem?.ft46LiberationWar,
    text: 'The Liberation War is now taught in schools, documented in archives, denied by some Pakistani politicians, and contested among scholars about the numbers. You remember the nine months as a duration that passed differently from any other nine months you have lived. The country that came out of it — Bangladesh, Sonar Bangla — has been many things since: autocracy, garment factory floor, climate frontline, a democracy of a kind. What happened in 1971 did not stop happening in 1971.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m -= 2; p.setMem('ft46LiberationWar', true) },
  },

  // ─── GUINEA — INDEPENDENCE AND ITS AFTERMATH ────────────────────────────────

  {
    id: 'ft46_guinea_independence_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('guinea_independence_proclaimed') &&
      G.age >= 55 &&
      G.currentYear >= 1980 &&
      !G.mem?.ft46GuineaIndep,
    text: 'Guinea said no in 1958 and France stripped the ministry buildings bare — took the files, the medicine, the light fixtures, the staplers. What followed was Sékou Touré, who had led the no vote, and Camp Boiro, where the men who had fought alongside him disappeared. The independence that came with the no cost more than the lightbulbs. The word for what you gained — *liberté* — became harder to say as the years showed what the country had actually received in exchange for its refusal of France.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft46GuineaIndep', true) },
  },

  // ─── JAMAICAN INDEPENDENCE — THE RECKONING ──────────────────────────────────

  {
    id: 'ft46_jamaican_independence_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('jamaican_independence_generation') &&
      G.age >= 55 &&
      G.currentYear >= 1985 &&
      !G.mem?.ft46JamIndep,
    text: 'August 6, 1962. The flag went up and the Union Jack came down and you remember how it felt to be present for that — a specific pride that belonged to a specific day. What the country did with independence is what the country did: the garrison constituencies that turned Kingston neighbourhoods into armed political camps, the exodus that sent a quarter of the island to London and Brooklyn and Toronto. The flag is still flying. What it flies over is a more complicated answer than anything the flags promised that day.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 2; p.setMem('ft46JamIndep', true) },
  },

  // ─── BAY OF PIGS — THE LONG VINDICATION ─────────────────────────────────────

  {
    id: 'ft46_bay_of_pigs_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('bay_of_pigs_generation') &&
      G.age >= 45 &&
      G.currentYear >= 2000 &&
      !G.mem?.ft46BayOfPigs,
    text: 'Seventy-two hours. The exile force landed at Playa Girón and was defeated in seventy-two hours. What the defeat meant was: this country will not be taken back easily, and the United States will spend the next six decades trying to make the alternative to the revolution look more attractive than it is. The revolution lasted longer than anyone who planned the invasion expected. Whether what it lasted into justified the duration is the question you have been living inside.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 2; p.setMem('ft46BayOfPigs', true) },
  },

  // ─── MARIEL — THE ONES WHO LEFT AND THE ONES WHO STAYED ────────────────────

  {
    id: 'ft46_mariel_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('mariel_generation') &&
      G.age >= 35 &&
      G.currentYear >= 1995 &&
      !G.mem?.ft46Mariel,
    text: 'The ones who left on the Mariel boats are in Miami now, or their children are. The families that stayed have not discussed the ones who left, and that silence has lasted long enough to become a kind of answer in itself. The revolution has outlasted every prediction about it, including predictions made by people who stayed and predictions made by people who left. You know people on both sides of the water. The divide between them is not simple. It is made of specific choices made in specific months that cannot be undone.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 3; p.setMem('ft46Mariel', true) },
  },

  // ─── COCHABAMBA — WHAT THE WATER WAR MEANT ─────────────────────────────────

  {
    id: 'ft46_cochabamba_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('cochabamba_witness') &&
      G.age >= 35 &&
      G.currentYear >= 2010 &&
      !G.mem?.ft46Cochabamba,
    text: 'The water returned to public hands. Bechtel left. Victor Hugo Daza, who was seventeen when they shot him, has a street named after him in Cochabamba. The Water War is now in political science papers as the first successful uprising against water privatisation in the world. What it felt like from inside the city in 2000 was different from how it reads in those papers. What you remember is the weight of people filling the streets and the specific calculation in the air about whether this time would be different from every other time.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 4; p.karma += 3; p.setMem('ft46Cochabamba', true) },
  },

  // ─── EVO — THE PLURINATIONAL STATE IN RETROSPECT ────────────────────────────

  {
    id: 'ft46_bol_evo_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bol_evo_generation') &&
      G.age >= 35 &&
      G.currentYear >= 2019 &&
      !G.mem?.ft46BolEvo,
    text: 'Evo Morales took office in January 2006 in a ceremony at Tiwanaku, before the ruins of a civilisation older than the colonial state that had governed Bolivia for five centuries. The symbolic weight of that beginning was real and enormous. What followed was thirteen years of a plurinational state in which extreme poverty fell by half. Then a disputed election in 2019 and the question — still not settled to everyone\'s satisfaction — of whether what happened next was a coup or a democratic correction or both. You have a position. The position has cost you something in certain rooms.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m -= 2; p.setMem('ft46BolEvo', true) },
  },

  // ─── SINGAPORE INDEPENDENCE — THE CITY-STATE THAT SURVIVED ─────────────────

  {
    id: 'ft46_sg_independence_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('sg_independence_witness') &&
      G.age >= 60 &&
      G.currentYear >= 1990 &&
      !G.mem?.ft46SgIndep,
    text: 'Lee Kuan Yew appeared on television in tears in 1965 and said Singapore had been expelled from Malaysia, and that the island — two million people, no hinterland, no water supply, British bases that would not be there forever — would have to make itself viable. It did. By the time you are old, Singapore has one of the highest per-capita incomes in Asia, housing that works, and a press that cannot report what it sees. You have lived long enough to hold these things in one hand without feeling the need to resolve them into a single verdict.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m += 2; p.setMem('ft46SgIndep', true) },
  },

  // ─── LKY DEATH — THE POST-LKY QUESTION ─────────────────────────────────────

  {
    id: 'ft46_sg_lky_later',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('sg_lky_mourning_witness') &&
      G.age >= 35 &&
      G.currentYear >= 2020 &&
      !G.mem?.ft46SgLky,
    text: 'The queue to pay respects stretched through the night. The grief was real — the grief of a country for the person who had made the country possible in its current form, which is not the same as saying the current form was the only form possible. Lee Kuan Yew governed Singapore, in one capacity or another, for fifty-six years. The question of what Singapore becomes without him is the question that everyone is now living inside, and the PAP has continued to provide one answer, and the question continues to be asked.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 4; p.setMem('ft46SgLky', true) },
  },

  // ─── ZHANAOZEN — WHAT THE MASSACRE REVEALED ─────────────────────────────────

  {
    id: 'ft46_kaz_zhanaozen_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('kaz_zhanaozen_witness') &&
      G.age >= 35 &&
      G.currentYear >= 2020 &&
      !G.mem?.ft46KazZhan,
    text: 'December 16 was Independence Day. They fired into the square on Independence Day — the oil workers who had been striking for seven months. Sixteen deaths acknowledged; human rights organisations documented more. The union leaders were arrested. Nazarbayev held a press conference and called the workers provocateurs. The question of what Zhanaozen demonstrated — whether it was aberration or policy — was answered, as such questions usually are, by what happened next: Nazarbayev held power for eight more years, and the Mangystau region, where Kazakhstan\'s oil is extracted, remained among the country\'s poorest.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft46KazZhan', true) },
  },

  // ─── MOBUTU FALL — THE ARITHMETIC OF DRC ────────────────────────────────────

  {
    id: 'ft46_mobutu_fall_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('mobutu_fall_generation') &&
      G.age >= 55 &&
      G.currentYear >= 2005 &&
      !G.mem?.ft46MobutuFall,
    text: 'Mobutu left Kinshasa on May 16, 1997, and died in Morocco three months later. Kabila renamed the country back to the Democratic Republic of Congo and the Second Congo War began seventeen months after the first one ended. The specific arithmetic of DRC history is this: the war that ended Mobutu killed some; the war that followed it killed four million people, mostly from disease and hunger. You have lived inside this arithmetic long enough to know that the international community documented all of it and responded with missions and reports. You are still here.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 4; p.setMem('ft46MobutuFall', true) },
  },

  // ─── ERITREAN BORDER WAR — THE NO-WAR NO-PEACE STATE ───────────────────────

  {
    id: 'ft46_eritrean_border_war_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('eritrean_border_war_era') &&
      G.age >= 50 &&
      G.currentYear >= 2018 &&
      !G.mem?.ft46EritBorderWar,
    text: 'The border war began in 1998 over Badme — a town that settled nothing — and it ended in 2000 but it did not end. The no-war, no-peace stalemate became the permanent emergency: the justification for national service with no end date, for sealed borders, for the G-15 who disappeared from their offices in 2001. When Abiy Ahmed accepted the boundary commission ruling in 2018 and flew to Asmara and embraced Isaias, you watched the images. The peace did not release the people who had been imprisoned for calling for peace twenty years earlier.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft46EritBorderWar', true) },
  },

  // ─── RAINBOW WARRIOR — WHAT RADICALISED MEANS ──────────────────────────────

  {
    id: 'ft46_nz_rainbow_warrior_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nz_rainbow_warrior_generation') &&
      G.age >= 55 &&
      G.currentYear >= 2005 &&
      !G.mem?.ft46NzRainbow,
    text: 'France decorated the DGSE agents who sank the Rainbow Warrior. The two arrested in Auckland served minimal sentences on a French Pacific territory and were repatriated. France applied trade pressure and New Zealand accepted a settlement of thirteen million dollars. Fernando Pereira, the Dutch photographer who drowned below decks, was thirty-five. What the bombing is described as having done — radicalised a generation toward nuclear-free legislation — is accurate. What the word radicalised means from the inside is: you kept paying attention to something that the official account declared resolved.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.karma += 2; p.setMem('ft46NzRainbow', true) },
  },

]

// events_ethiopia.js
// Ethiopia: Derg military junta 1974–91, Red Terror 1977–78, famine 1983–85,
// Ethiopian Orthodox fasting culture, coffee ceremony as social institution,
// Addis Ababa construction boom 2010s. Never colonised — that pride runs through everything.

const IS_ETHIOPIAN = (G) => G.currentCountry === 'Ethiopia'

export const ETHIOPIA_EVENTS = [

  // ── RED TERROR 1977–78 ────────────────────────────────────────────────────

  {
    id: 'eth_red_terror_1977',
    phase: 'young_adult',
    weight: 5,
    when: (G) => IS_ETHIOPIAN(G) && G.currentYear >= 1977 && G.currentYear <= 1979 && G.age >= 16 && G.age <= 40 && !G.mem.ethRedTerror,
    text: 'The kebele committee has a list. Men with rifles come at night. Your friend from the technical school — his father had said something, or his uncle was in the EPRP, or someone had marked his name for reasons not given — is not at school the next day. The proper word for what happened to him is not in the newspapers. Families who want the body returned must pay for the bullets.',
    choices: [
      {
        text: 'Keep your head down. Survival is not cowardice.',
        tag: 'eth_red_terror_survived',
        outcome: 'You disappear into ordinary life for the duration. What ordinary life means during the Red Terror is a calculation you make every day.',
        effect: (p) => { p.m -= 18; p.addFlag('eth_red_terror_survived'); p.setMem('ethRedTerror', true) },
      },
      {
        text: 'Leave Addis — go to relatives in the countryside.',
        tag: null,
        outcome: 'The countryside is not safe either, but the lists are shorter. You wait there for two years.',
        effect: (p) => { p.m -= 14; p.h -= 3; p.setMem('ethRedTerror', true) },
      },
    ],
  },

  // ── FAMINE 1983–85 ────────────────────────────────────────────────────────

  {
    id: 'eth_famine_1984_village',
    phase: null,
    weight: 4,
    when: (G) => IS_ETHIOPIAN(G) && G.currentYear >= 1983 && G.currentYear <= 1986 && G.age >= 5 && G.age <= 16 && G.ruralUrban === 'rural' && !G.mem.ethFamine,
    text: 'The dry season does not end when it should. By March the family is eating what was set aside for planting. By June you are eating twice a day, then once. The adults do not explain the calculations but you learn them by watching. Your mother gives you her portion and says she is not hungry. You are eight years old. You understand that she is lying.',
    choices: null,
    effect: (p) => { p.m -= 20; p.h -= 8; p.addFlag('famine_memory'); p.setMem('ethFamine', true) },
  },

  // ── DERG FALL 1991 ────────────────────────────────────────────────────────

  {
    id: 'eth_derg_fall_1991',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_ETHIOPIAN(G) && G.currentYear >= 1991 && G.currentYear <= 1992 && G.age >= 18 && !G.mem.ethDergFall,
    text: 'Mengistu is gone. He fled to Zimbabwe. The EPRDF fighters are in the city and some of them look like teenagers, which some of them are. People come into the street. What you feel is not quite happiness — it has been seventeen years — it is something more cautious, the specific sensation of a weight you had stopped noticing because it had been there so long.',
    choices: null,
    effect: (p) => { p.m += 12; p.setMem('ethDergFall', true) },
  },

  // ── ORTHODOX FASTING CALENDAR ─────────────────────────────────────────────

  {
    id: 'eth_orthodox_fasting',
    phase: 'childhood',
    weight: 3,
    when: (G) => IS_ETHIOPIAN(G) && G.religion === 'christian_orthodox' && G.age >= 7 && G.age <= 11 && !G.mem.ethOrthodox,
    text: 'There are two hundred fasting days in the Orthodox calendar. The major ones — Tsome Hidar, the long Lent, the fasting of the Apostles — mean no meat, no dairy, no eggs until after the afternoon service. You grow up knowing which months taste different. The Ge\'ez script you learn at church is two thousand years old. The priest who teaches it learned it from someone who learned it from someone going back further than you can count.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.setMem('ethOrthodox', true) },
  },

  // ── COFFEE CEREMONY ───────────────────────────────────────────────────────

  {
    id: 'eth_coffee_ceremony',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_ETHIOPIAN(G) && G.age >= 18 && !G.mem.ethCoffee,
    text: 'The beans are roasted in the same room, on a pan over charcoal. You smell them change. The ceremony takes two hours: three rounds — abol, tona, baraka — and you do not leave before the third cup without giving offence. News is exchanged, disputes are aired, marriages are discussed. The institution predates the modern state by a significant margin.',
    choices: null,
    effect: (p) => { p.m += 6; p.s += 3; p.setMem('ethCoffee', true) },
  },

  // ── ADDIS ABABA GROWTH 2010s ─────────────────────────────────────────────

  {
    id: 'eth_addis_growth_2010s',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_ETHIOPIAN(G) && G.currentYear >= 2010 && G.currentYear <= 2022 && G.age >= 25 && !G.mem.ethAddisGrowth,
    text: 'The light rail runs now, past construction sites that have been building for five years, past Chinese contractors eating lunch at noon, past the condominiums that are supposed to solve the housing problem and do not quite. The GDP growth figures are the envy of the continent. In the neighbourhood where you grew up, the rent has tripled. You know two families whose land was cleared for the new road.',
    choices: null,
    effect: (p) => { p.e += 2; p.m -= 4; p.setMem('ethAddisGrowth', true) },
  },

  // ── ABIY AHMED AND THE PEACE DEAL 2018 ───────────────────────────────────

  {
    id: 'eth_abiy_peace_2018',
    phase: 'midlife',
    weight: 4,
    when: (G) => IS_ETHIOPIAN(G) && G.currentYear >= 2018 && G.currentYear <= 2020 && G.age >= 18 && !G.mem.ethAbiyPeace,
    text: 'April 2018. Abiy Ahmed becomes prime minister at forty-one. He is Oromo, which has never happened. He releases political prisoners. He meets Isaias Afwerki of Eritrea in Asmara and ends the no-war-no-peace that has existed since the 1998-2000 border war. The border opens. Eritrean families separated for twenty years cross at Zalambessa and embrace on camera. In October 2019 Abiy wins the Nobel Peace Prize. The Ethiopian diaspora celebrates in Washington and London. In Addis, people argue about whether this is real or performed. It feels real enough.',
    choices: null,
    effect: (p) => { p.m += 12; p.addFlag('eth_abiy_generation'); p.setMem('ethAbiyPeace', true) },
  },

  // ── TIGRAY WAR 2020–2022 ─────────────────────────────────────────────────

  {
    id: 'eth_tigray_war_2020',
    phase: 'midlife',
    weight: 5,
    when: (G) => IS_ETHIOPIAN(G) && G.currentYear >= 2020 && G.currentYear <= 2022 && G.age >= 16 && !G.mem.ethTigray,
    text: 'November 4, 2020. Abiy Ahmed orders the federal military into Tigray. The government calls it a law enforcement operation against the TPLF. The TPLF had dominated Ethiopia for twenty-seven years before Abiy — the old guard, the Tigray People\'s Liberation Front — and the conflict between them has been building since 2018. Within weeks the communications blackout is total: no independent journalists, no phone lines, no humanitarian access. What arrives is partial and delayed. By 2022, when the scale becomes legible, the estimates are 300,000 to 500,000 dead — one of the deadliest conflicts anywhere since World War Two. Eritrean troops fought alongside federal forces. Rape was used as a systematic weapon. This is the war fought by the man who won the Nobel Peace Prize.',
    choices: [
      {
        text: 'The TPLF dominated Ethiopia for a generation. The crackdown, whatever it became, started with a real grievance.',
        tag: null,
        outcome: 'The political argument existed. It does not cover the scale of what followed. You have both of those things in your understanding now and they do not resolve.',
        effect: (p) => { p.m -= 14; p.r += 10; p.addFlag('eth_tigray_witnessed'); p.setMem('ethTigray', true) },
      },
      {
        text: 'The Nobel Peace Prize laureate launched a war of this scale. That is the thing you cannot move past.',
        tag: null,
        outcome: 'The contradiction is not resolvable. Abiy kept the prize. The families in Tigray are still counting their dead.',
        effect: (p) => { p.m -= 18; p.r += 12; p.karma += 4; p.addFlag('eth_tigray_witnessed'); p.setMem('ethTigray', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'eth_pretoria_2022',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_ETHIOPIAN(G) && G.currentYear >= 2022 && G.currentYear <= 2025 && G.age >= 18 && G.flags.has('eth_tigray_witnessed') && !G.mem.ethPretoria,
    text: 'November 2022. The Pretoria peace agreement is signed. The war is over in the technical sense: the guns stop. The accounting is still in progress. 300,000 to 500,000 dead depending on whose methodology. Millions displaced. Starvation in Tigray during the blockade years. The peace does not bring the dead back or explain the full scope of what happened under the blackout. Abiy Ahmed retains the Nobel Peace Prize, which is awarded by the Norwegian Nobel Committee and cannot be revoked. You are living in the country that produced all of this in the span of four years.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 8; p.setMem('ethPretoria', true) },
  },

  // ── FOLLOW-THROUGH: RED TERROR MEMORY ────────────────────────────────────

  {
    id: 'eth_red_terror_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('eth_red_terror_survived') && G.age >= 55 && !G.mem.ethRedTerrorEcho,
    text: 'A student asks what you did during the Red Terror, the way students ask about history. You think about what the honest answer is. You say: you tried to be invisible. They nod. They have no reference for what that required.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('ethRedTerrorEcho', true) },
  },

]
